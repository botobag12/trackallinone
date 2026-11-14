
/**
 * Convert Universal Parcel Scraper responses
 * into a consistent TrackAllInOne structure.
 */

export function normalizeTrackingResult(response, trackingNumber) {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid tracking response.");
  }

  const result = response.result;

  if (!result || typeof result !== "object") {
    throw new Error("Tracking result is missing.");
  }

  const events = Array.isArray(result.events)
    ? result.events
    : [];

  return {
    success: true,

    trackingNumber:
      result.canonical_tracking_number ||
      trackingNumber,

    carrier:
      response.carrier || "Unknown",

    source:
      response.source || null,

    status:
      result.status || "unknown",

    currentStage:
      result.current_stage || "Unknown",

    lastStatusText:
      result.last_status_text || null,

    lastUpdate:
      result.last_update || null,

    expectedDelivery:
      result.expected_delivery || null,

    delivered:
      result.status === "delivered",

    origin: null,

    destination:
      result.destination_country_name ||
      result.destination_country ||
      null,

    sender:
      result.sender_name || null,

    receiver:
      result.receiver_name || null,

    weight:
      result.weight_kg ?? null,

    service:
      result.service_name || null,

    events: events.map((event) => ({
      date:
        event.instant ||
        event.time ||
        event.local_time ||
        null,

      status:
        event.stage ||
        event.description ||
        "Update",

      location:
        event.location || null,

      description:
        event.description ||
        event.stage ||
        "Tracking update",

      stage:
        event.stage || null,

      timezone:
        event.time_zone || null,
    })),

    attempts:
      Array.isArray(response.attempts)
        ? response.attempts
        : [],

    historyTruncated:
      Boolean(result.history_truncated),
  };
}
