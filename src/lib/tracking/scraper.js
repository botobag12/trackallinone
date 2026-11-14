
import { createTracker } from "universal-parcel-scraper/node";

// Create one reusable tracker instance for this server process.
const tracker = createTracker();

/**
 * Track a shipment.
 *
 * @param {string} trackingNumber
 * @param {string|null} carrier - Optional carrier ID
 * @param {object} options - Optional tracking information
 * @returns {Promise<object>}
 */
export async function trackShipment(
  trackingNumber,
  carrier = null,
  options = {}
) {
  if (
    typeof trackingNumber !== "string" ||
    !trackingNumber.trim()
  ) {
    throw new Error("A valid tracking number is required.");
  }

  const number = trackingNumber.trim();

  const input = {
    number,
  };

  // Only pass a carrier when explicitly provided.
  if (typeof carrier === "string" && carrier.trim()) {
    input.carrier = carrier.trim();
  }

  // Optional delivery postcode, if supported by the tracking flow.
  if (
    typeof options.postcode === "string" &&
    options.postcode.trim()
  ) {
    input.postcode = options.postcode.trim();
  }

  // Optional tracking URL.
  if (
    typeof options.trackingUrl === "string" &&
    options.trackingUrl.trim()
  ) {
    input.trackingUrl = options.trackingUrl.trim();
  }

  // Execute tracking.
  // Errors are allowed to reach the API route for proper handling.
  return await tracker.track(input);
}

/**
 * Identify a possible carrier from user input.
 * This is recognition, not confirmation that tracking will succeed.
 */
export function detectShipmentCarrier(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Tracking input is required.");
  }

  return tracker.detect(input.trim());
}

/**
 * Find possible carrier matches.
 */
export async function recognizeShipmentCarrier(input) {
  if (typeof input !== "string" || !input.trim()) {
    throw new Error("Tracking input is required.");
  }

  return tracker.recognize(input.trim());
}
