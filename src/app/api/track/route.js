
export async function POST(request) {
  try {
    // 1. Get the API key from server environment variables
    const apiKey = process.env.TRACKING_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          success: false,
          message: "Tracking service is not configured.",
        },
        { status: 500 }
      );
    }

    // 2. Read and validate the incoming request
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Invalid request body. Please send valid JSON.",
        },
        { status: 400 }
      );
    }

    const trackingNumber =
      typeof body?.trackingNumber === "string"
        ? body.trackingNumber.trim()
        : "";

    if (!trackingNumber || trackingNumber.length > 100) {
      return Response.json(
        {
          success: false,
          message: "Enter a valid tracking number.",
        },
        { status: 400 }
      );
    }

    // 3. Send only the tracking number.
    // TrackMyParcel will automatically detect the courier.
    const payload = {
      trackingNumber,
    };

    // 4. Send the request to TrackMyParcel
    let upstream;

    try {
      upstream = await fetch(
        "https://trackmyparcel.pk/v1/track",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
          signal: AbortSignal.timeout(20000),
        }
      );
    } catch (error) {
      console.error(
        "TrackMyParcel connection error:",
        error?.name || "Unknown error"
      );

      const timedOut = error?.name === "TimeoutError";

      return Response.json(
        {
          success: false,
          message: timedOut
            ? "Tracking is taking too long. Please try again."
            : "Unable to connect to the tracking service. Please try again.",
        },
        { status: timedOut ? 504 : 502 }
      );
    }

    // 5. Read the provider response
    const result = await upstream.json().catch(() => null);

    // 6. Handle provider HTTP errors
    if (!upstream.ok) {
      console.error(
        "TrackMyParcel HTTP status:",
        upstream.status
      );

      console.error(
        "TrackMyParcel error code:",
        result?.error?.code || "UNKNOWN_ERROR"
      );

      if (result?.error?.code === "TRACKING_NOT_FOUND") {
        return Response.json(
          {
            success: false,
            message:
              "No shipment found for this tracking number. Check the number and try again.",
          },
          { status: 404 }
        );
      }

      if (upstream.status === 401 || upstream.status === 403) {
        return Response.json(
          {
            success: false,
            message:
              "The tracking service rejected the request. Please check the API credentials or permissions.",
          },
          { status: upstream.status }
        );
      }

      if (upstream.status === 429) {
        return Response.json(
          {
            success: false,
            message:
              "Too many tracking requests. Please try again later.",
          },
          { status: 429 }
        );
      }

      return Response.json(
        {
          success: false,
          message:
            "Unable to retrieve tracking information. Please try again.",
        },
        { status: 502 }
      );
    }

    // 7. Validate the provider response
    if (!result || typeof result.success !== "boolean") {
      return Response.json(
        {
          success: false,
          message:
            "Unexpected response from the tracking service.",
        },
        { status: 502 }
      );
    }

    // 8. Return the tracking result to the frontend
    return Response.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    console.error(
      "Tracking route error:",
      error?.name || "Unknown error"
    );

    return Response.json(
      {
        success: false,
        message:
          "Unable to process your tracking request.",
      },
      { status: 500 }
    );
  }
}
