
import { SELECTABLE_CARRIERS } from "universal-parcel-scraper";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/supabase/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Get all couriers and their availability.
export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return Response.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { data: settings, error } = await supabaseAdmin
      .from("courier_settings")
      .select("courier_id, enabled");

    if (error) {
      throw error;
    }

    const settingsMap = new Map(
      settings.map((item) => [item.courier_id, item.enabled])
    );

    const couriers = SELECTABLE_CARRIERS.map((carrier) => ({
      id: carrier.id,
      name: carrier.name,
      enabled: settingsMap.get(carrier.id) ?? true,
    }));

    return Response.json({
      success: true,
      couriers,
    });
  } catch (error) {
    console.error("Courier loading error:", error.message);

    return Response.json(
      { success: false, message: "Unable to load couriers." },
      { status: 500 }
    );
  }
}

// Enable or disable a courier.
export async function PATCH(request) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return Response.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const courierId =
      typeof body.courierId === "string"
        ? body.courierId.trim()
        : "";

    const enabled = body.enabled;

    if (
      !courierId ||
      typeof enabled !== "boolean"
    ) {
      return Response.json(
        { success: false, message: "Invalid courier settings." },
        { status: 400 }
      );
    }

    const courierExists = SELECTABLE_CARRIERS.some(
      (carrier) => carrier.id === courierId
    );

    if (!courierExists) {
      return Response.json(
        { success: false, message: "Courier not found." },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from("courier_settings")
      .upsert(
        {
          courier_id: courierId,
          enabled,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "courier_id",
        }
      );

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: "Courier setting updated.",
      courierId,
      enabled,
    });
  } catch (error) {
    console.error("Courier update error:", error.message);

    return Response.json(
      { success: false, message: "Unable to update courier setting." },
      { status: 500 }
    );
  }
}
