
import { SELECTABLE_CARRIERS } from "universal-parcel-scraper";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = (searchParams.get("q") || "")
      .trim()
      .toLowerCase();

    if (!query) {
      return Response.json({
        success: true,
        carriers: [],
      });
    }

    // Load courier availability settings from Supabase.
    const { data: settings, error } = await supabaseAdmin
      .from("courier_settings")
      .select("courier_id, enabled");

    if (error) {
      throw error;
    }

    const settingsMap = new Map(
      settings.map((item) => [
        item.courier_id,
        item.enabled,
      ])
    );

    // Search only enabled couriers.
    // Couriers without a database setting are enabled by default.
    const carriers = SELECTABLE_CARRIERS
      .filter((carrier) => {
        const isEnabled =
          settingsMap.get(carrier.id) !== false;

        if (!isEnabled) {
          return false;
        }

        const searchableText = [
          carrier.id,
          carrier.name,
          ...(carrier.aliases || []),
          ...(carrier.countries || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 30)
      .map((carrier) => ({
        id: carrier.id,
        name: carrier.name,
        aliases: carrier.aliases || [],
        countries: carrier.countries || [],
        trackingMode:
          carrier.capabilities?.tracking?.mode || "unknown",
      }));

    return Response.json({
      success: true,
      carriers,
    });
  } catch (error) {
    console.error("Carrier search error:", {
      message: error?.message,
    });

    return Response.json(
      {
        success: false,
        message: "Unable to load carriers.",
      },
      { status: 500 }
    );
  }
}
