
import { SELECTABLE_CARRIERS } from "universal-parcel-scraper";

import { trackShipment } from "@/lib/tracking/scraper";
import { normalizeTrackingResult } from "@/lib/tracking/normalize";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function hasUsefulTrackingData(result) {
  if (!result || result.success !== true) {
    return false;
  }

  const hasStatus =
    result.status &&
    result.status.toLowerCase() !== "unknown";

  const hasEvents =
    Array.isArray(result.events) &&
    result.events.length > 0;

  return Boolean(hasStatus || hasEvents);
}

function isValidUUID(value) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

// Save analytics without interrupting the tracking operation.
async function saveTrackingAnalytics({
  requestId,
  attemptType,
  courierId,
  success,
  responseTime,
  failureReason,
}) {
  try {
    const { error: requestError } = await supabaseAdmin
      .from("tracking_requests")
      .upsert(
        {
          id: requestId,
          final_success: success,
          final_method: attemptType,
          final_courier_id: courierId || null,
          total_duration_ms: responseTime,
          failure_reason: success
            ? null
            : String(failureReason || "Tracking unsuccessful").slice(0, 500),
        },
        {
          onConflict: "id",
        }
      );

    if (requestError) {
      console.error("Analytics request save failed:", {
        message: requestError.message,
      });

      return;
    }

    const { error: attemptError } = await supabaseAdmin
      .from("tracking_attempts")
      .insert({
        request_id: requestId,
        attempt_type: attemptType,
        courier_id: courierId || null,
        success,
        response_time_ms: responseTime,
        failure_reason: success
          ? null
          : String(failureReason || "Tracking unsuccessful").slice(0, 500),
      });

    if (attemptError) {
      console.error("Analytics attempt save failed:", {
        message: attemptError.message,
      });
    }
  } catch (error) {
    console.error("Analytics storage unavailable:", {
      message: error?.message,
    });
  }
}

export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid request. Please try again.",
        },
        { status: 400 }
      );
    }

    const trackingNumber =
      typeof body.trackingNumber === "string"
        ? body.trackingNumber.trim()
        : "";

    const carrierId =
      typeof body.carrier === "string"
        ? body.carrier.trim()
        : "";

    if (!trackingNumber) {
      return Response.json(
        {
          success: false,
          message: "Please enter a tracking number.",
        },
        { status: 400 }
      );
    }

    if (trackingNumber.length > 100) {
      return Response.json(
        {
          success: false,
          message: "Tracking number is too long.",
        },
        { status: 400 }
      );
    }

    let selectedCarrier = null;

    
if (carrierId) {
  selectedCarrier = SELECTABLE_CARRIERS.find(
    (item) => item.id === carrierId
  );

  if (!selectedCarrier) {
    return Response.json(
      {
        success: false,
        message: "The selected carrier is not supported.",
      },
      { status: 400 }
    );
  }

  // Check whether this courier is enabled in Supabase.
  const {
    data: courierSetting,
    error: courierSettingError,
  } = await supabaseAdmin
    .from("courier_settings")
    .select("enabled")
    .eq("courier_id", carrierId)
    .maybeSingle();

  if (courierSettingError) {
    console.error(
      "Courier availability check failed:",
      courierSettingError.message
    );

    return Response.json(
      {
        success: false,
        message: "Unable to verify courier availability. Please try again.",
      },
      { status: 500 }
    );
  }

  if (courierSetting && !courierSetting.enabled) {
    return Response.json(
      {
        success: false,
        message: "This courier is currently unavailable.",
      },
      { status: 400 }
    );
  }
}


    // Reuse the existing ID when the user manually selects a carrier.
    // Otherwise, create a new analytics request.
    const requestId = isValidUUID(body.analyticsRequestId)
      ? body.analyticsRequestId
      : crypto.randomUUID();

    const attemptType = carrierId ? "manual" : "automatic";
    const startTime = Date.now();

    try {
      const trackingResponse = await trackShipment(
        trackingNumber,
        carrierId || null
      );

      const responseTime = Date.now() - startTime;

      const normalizedResult = normalizeTrackingResult(
        trackingResponse,
        trackingNumber
      );

      if (hasUsefulTrackingData(normalizedResult)) {
        await saveTrackingAnalytics({
          requestId,
          attemptType,
          courierId: carrierId || null,
          success: true,
          responseTime,
        });

        return Response.json({
          ...normalizedResult,
          analyticsRequestId: requestId,
        });
      }

      const failureMessage = carrierId
        ? `No tracking history was found for ${selectedCarrier.name}. Please check the tracking number.`
        : "Automatic carrier detection could not retrieve tracking information. Please select your carrier and try again.";

      await saveTrackingAnalytics({
        requestId,
        attemptType,
        courierId: carrierId || null,
        success: false,
        responseTime,
        failureReason: failureMessage,
      });

      return Response.json(
        {
          success: false,
          needsCarrierSelection: !carrierId,
          carrierAttempted: Boolean(carrierId),
          analyticsRequestId: requestId,
          message: failureMessage,
        },
        { status: 422 }
      );
    } catch (error) {
      const responseTime = Date.now() - startTime;

      console.error("Tracking attempt failed:", {
        name: error?.name,
        message: error?.message,
        carrier: carrierId || "automatic",
      });

      const failureMessage = carrierId
        ? `Unable to retrieve tracking information from ${selectedCarrier.name}. Please check the number or try another carrier.`
        : "Automatic tracking was unsuccessful. Please select your carrier and try again.";

      await saveTrackingAnalytics({
        requestId,
        attemptType,
        courierId: carrierId || null,
        success: false,
        responseTime,
        failureReason: failureMessage,
      });

      return Response.json(
        {
          success: false,
          needsCarrierSelection: !carrierId,
          carrierAttempted: Boolean(carrierId),
          analyticsRequestId: requestId,
          message: failureMessage,
        },
        { status: 422 }
      );
    }
  } catch (error) {
    console.error("Tracking API error:", {
      name: error?.name,
      message: error?.message,
    });

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
