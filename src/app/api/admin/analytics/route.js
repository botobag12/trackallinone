
import { SELECTABLE_CARRIERS } from "universal-parcel-scraper";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/supabase/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 1000;

async function fetchAllRows(buildQuery) {
  const rows = [];
  let offset = 0;

  while (true) {
    const { data, error } = await buildQuery().range(
      offset,
      offset + PAGE_SIZE - 1
    );

    if (error) {
      throw new Error(error.message);
    }

    rows.push(...(data || []));

    if (!data || data.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return rows;
}

function calculateAverage(values) {
  const validValues = values.filter(
    (value) => Number.isFinite(value)
  );

  if (!validValues.length) return 0;

  return Math.round(
    validValues.reduce((sum, value) => sum + value, 0) /
      validValues.length
  );
}

export async function GET(request) {
  try {
    // 1. Verify administrator access.
    const admin = await getAdminUser();

    if (!admin) {
      return Response.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    // 2. Read dashboard filters.
    const { searchParams } = new URL(request.url);

    const requestedDays = Number(
      searchParams.get("days") || 30
    );

    const allowedDays = [7, 30, 90, 365];

    const days = allowedDays.includes(requestedDays)
      ? requestedDays
      : 30;

    const courierId = (
      searchParams.get("courier") || ""
    ).trim();

    if (courierId && courierId.length > 100) {
      return Response.json(
        { success: false, message: "Invalid courier filter." },
        { status: 400 }
      );
    }

    const startDate = new Date(
      Date.now() - days * 24 * 60 * 60 * 1000
    ).toISOString();

    // 3. Load tracking requests.
    const requests = await fetchAllRows(() => {
      let query = supabaseAdmin
        .from("tracking_requests")
        .select(
          "id, created_at, final_success, final_method, final_courier_id, total_duration_ms, failure_reason"
        )
        .gte("created_at", startDate)
        .order("created_at", { ascending: false });

      if (courierId) {
        query = query.eq("final_courier_id", courierId);
      }

      return query;
    });

    // 4. Load individual tracking attempts.
    const attempts = await fetchAllRows(() => {
      let query = supabaseAdmin
        .from("tracking_attempts")
        .select(
          "id, request_id, attempted_at, attempt_type, courier_id, success, response_time_ms, failure_reason"
        )
        .gte("attempted_at", startDate)
        .order("attempted_at", { ascending: false });

      if (courierId) {
        query = query.eq("courier_id", courierId);
      }

      return query;
    });

    // 5. Calculate request statistics.
    const successfulRequests = requests.filter(
      (item) => item.final_success
    ).length;

    const failedRequests = requests.length - successfulRequests;

    // Group tracking requests by UTC calendar date.
    const dailyMap = new Map();

    const firstDate = new Date(startDate);
    const currentDate = new Date();

    const firstDay = new Date(
      Date.UTC(
        firstDate.getUTCFullYear(),
        firstDate.getUTCMonth(),
        firstDate.getUTCDate()
      )
    );

    const lastDay = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    );

    // Initialize every calendar day, including days with zero requests.
    for (
      let date = new Date(firstDay);
      date <= lastDay;
      date.setUTCDate(date.getUTCDate() + 1)
    ) {
      const dateKey = date.toISOString().slice(0, 10);

      dailyMap.set(dateKey, {
        date: dateKey,
        total: 0,
        successful: 0,
        failed: 0,
      });
    }

    // Add actual request records to their corresponding dates.
    for (const item of requests) {
      const dateKey = new Date(item.created_at)
        .toISOString()
        .slice(0, 10);

      const day = dailyMap.get(dateKey);

      if (!day) continue;

      day.total += 1;

      if (item.final_success) {
        day.successful += 1;
      } else {
        day.failed += 1;
      }
    }

    const dailyTrend = Array.from(dailyMap.values());


    const successRate = requests.length
      ? Number(
          ((successfulRequests / requests.length) * 100).toFixed(2)
        )
      : 0;

    // 6. Calculate attempt statistics.
    const successfulAttempts = attempts.filter(
      (item) => item.success
    ).length;

    const failedAttempts = attempts.length - successfulAttempts;

    const averageResponseTime = calculateAverage(
      attempts.map((item) => item.response_time_ms)
    );

    // 7. Build courier performance statistics.
    const carrierNames = new Map(
      SELECTABLE_CARRIERS.map((carrier) => [
        carrier.id,
        carrier.name,
      ])
    );

    const courierMap = new Map();

    for (const attempt of attempts) {
      const id = attempt.courier_id || "automatic-detection";

      if (!courierMap.has(id)) {
        courierMap.set(id, {
          courierId: id,
          courierName:
            carrierNames.get(id) ||
            (id === "automatic-detection"
              ? "Automatic detection"
              : id),
          total: 0,
          successful: 0,
          failed: 0,
          responseTimes: [],
        });
      }

      const courier = courierMap.get(id);

      courier.total += 1;

      if (attempt.success) {
        courier.successful += 1;
      } else {
        courier.failed += 1;
      }

      if (Number.isFinite(attempt.response_time_ms)) {
        courier.responseTimes.push(attempt.response_time_ms);
      }
    }

    const couriers = Array.from(courierMap.values())
      .map((courier) => ({
        courierId: courier.courierId,
        courierName: courier.courierName,
        total: courier.total,
        successful: courier.successful,
        failed: courier.failed,
        successRate: Number(
          ((courier.successful / courier.total) * 100).toFixed(2)
        ),
        averageResponseTime: calculateAverage(
          courier.responseTimes
        ),
      }))
      .sort((a, b) => b.total - a.total);

    // 8. Group failure reasons.
    const reasonMap = new Map();

    for (const attempt of attempts) {
      if (attempt.success) continue;

      const reason =
        attempt.failure_reason || "Unknown failure";

      reasonMap.set(
        reason,
        (reasonMap.get(reason) || 0) + 1
      );
    }

    const failureReasons = Array.from(reasonMap.entries())
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 9. Return recent activity without shipment details.
    const recentActivity = attempts.slice(0, 50).map(
      (attempt) => ({
        id: attempt.id,
        requestId: attempt.request_id,
        attemptedAt: attempt.attempted_at,
        attemptType: attempt.attempt_type,
        courierId: attempt.courier_id,
        courierName:
          carrierNames.get(attempt.courier_id) ||
          (attempt.courier_id
            ? attempt.courier_id
            : "Automatic detection"),
        success: attempt.success,
        responseTime: attempt.response_time_ms,
        failureReason: attempt.failure_reason,
      })
    );

    // 10. Send dashboard data.
    return Response.json({
      success: true,
      filters: {
        days,
        courierId: courierId || "all",
        startDate,
      },
      overview: {
        totalRequests: requests.length,
        successfulRequests,
        failedRequests,
        successRate,
        totalAttempts: attempts.length,
        successfulAttempts,
        failedAttempts,
        averageResponseTime,
      },
    availableCouriers: SELECTABLE_CARRIERS.map((carrier) => ({
  id: carrier.id,
  name: carrier.name,
})),
dailyTrend,
couriers,
failureReasons,
recentActivity,
    });
  } catch (error) {
    console.error("Admin analytics error:", {
      message: error?.message,
    });

    return Response.json(
      {
        success: false,
        message: "Unable to load analytics.",
      },
      { status: 500 }
    );
  }
}
