"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import couriers from "@/data/couriers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function getShipmentData(result) {
  return (
    result?.data?.shipment ??
    result?.data?.tracking ??
    result?.shipment ??
    result?.tracking ??
    result?.data ??
    result
  );
}

function getStatus(result) {
  const shipment = getShipmentData(result);

  return (
    shipment?.currentStatus ??
    shipment?.current_status ??
    shipment?.status ??
    shipment?.trackingStatus ??
    shipment?.tracking_status ??
    result?.status ??
    null
  );
}

function getStatusText(result) {
  const status = getStatus(result);

  if (typeof status === "string" || typeof status === "number") {
    return String(status);
  }

  return (
    status?.name ??
    status?.description ??
    status?.label ??
    "Tracking information received"
  );
}

function getEvents(result) {
  const shipment = getShipmentData(result);

  const candidates = [
    shipment?.events,
    shipment?.history,
    shipment?.trackingHistory,
    shipment?.tracking_history,
    shipment?.checkpoints,
    shipment?.check_points,
    result?.events,
    result?.history,
    result?.data?.events,
    result?.data?.history,
  ];

  return candidates.find(Array.isArray) ?? [];
}

function getEventValue(event, keys) {
  for (const key of keys) {
    const value = event?.[key];

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    if (value && typeof value === "object") {
      const nestedValue =
        value.name ??
        value.description ??
        value.label ??
        value.value;

      if (
        typeof nestedValue === "string" ||
        typeof nestedValue === "number"
      ) {
        return String(nestedValue);
      }
    }
  }

  return "";
}

function getCourierName(result) {
  const shipment = getShipmentData(result);

  const detectedCourier =
    shipment?.courierName ??
    shipment?.courier_name ??
    shipment?.carrierName ??
    shipment?.carrier_name ??
    shipment?.courier ??
    shipment?.carrier;

  if (typeof detectedCourier === "string") {
    return detectedCourier;
  }

  if (detectedCourier && typeof detectedCourier === "object") {
    return (
      detectedCourier.name ??
      detectedCourier.title ??
      "Not identified"
    );
  }

  return "Not identified";
}

function formatReceiptDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function downloadTrackingReceipt({
  trackingNumber,
  courierName,
  status,
  events,
}) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const generatedAt = new Date();

  const colors = {
    red: [122, 23, 23],
    cream: [255, 248, 237],
    dark: [25, 25, 25],
    muted: [98, 91, 85],
    border: [229, 220, 208],
    white: [255, 255, 255],
  };

  let y = 0;

  const ensureSpace = (needed = 12) => {
    if (y + needed > pageHeight - 22) {
      pdf.addPage();
      y = 20;
    }
  };

  const addSectionTitle = (title) => {
    ensureSpace(15);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(...colors.red);
    pdf.text(title, margin, y);

    y += 7;
  };

  const addWrappedText = (
    text,
    { fontSize = 10, color = colors.dark, bold = false } = {}
  ) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);

    const lines = pdf.splitTextToSize(
      String(text || "Not available"),
      contentWidth
    );

    const lineHeight = fontSize * 0.48 + 1.5;
    ensureSpace(lines.length * lineHeight + 2);

    pdf.text(lines, margin, y);
    y += lines.length * lineHeight + 2;
  };

  // Header
  pdf.setFillColor(...colors.red);
  pdf.rect(0, 0, pageWidth, 43, "F");

  pdf.setTextColor(...colors.white);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("TrackAllInOne", margin, 18);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("SHIPMENT TRACKING REPORT", margin, 27);

  pdf.setFontSize(8);
  pdf.text(
    "Generated tracking information",
    margin,
    34
  );

  y = 54;

  // Receipt details
  addSectionTitle("Shipment Details");

  const details = [
    ["Tracking Number", trackingNumber],
    ["Courier", courierName],
    ["Current Status", status],
    ["Report Generated", formatReceiptDate(generatedAt)],
  ];

  for (const [label, value] of details) {
    ensureSpace(17);

    pdf.setFillColor(...colors.cream);
    pdf.setDrawColor(...colors.border);
    pdf.roundedRect(margin, y - 4, contentWidth, 13, 2, 2, "FD");

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...colors.muted);
    pdf.text(label, margin + 4, y + 1);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.dark);

    const valueLines = pdf.splitTextToSize(
      String(value || "Not available"),
      contentWidth - 48
    );

    pdf.text(valueLines[0], margin + 48, y + 1);

    y += 16;
  }

  y += 4;

  // Tracking history
  addSectionTitle("Tracking History");

  if (events.length === 0) {
    addWrappedText(
      "No individual tracking events were available in the tracking response. Please check the current status on the official courier website.",
      { color: colors.muted }
    );
  } else {
    events.forEach((event, index) => {
      const eventStatus =
        getEventValue(event, [
          "status",
          "description",
          "event",
          "message",
          "activity",
          "checkpoint_status",
        ]) || "Shipment update";

      const location = getEventValue(event, [
        "location",
        "city",
        "place",
        "address",
      ]);

      const date = getEventValue(event, [
        "date",
        "datetime",
        "timestamp",
        "time",
        "createdAt",
        "created_at",
        "eventDate",
        "event_date",
      ]);

      const descriptionLines = pdf.splitTextToSize(
        eventStatus,
        contentWidth - 8
      );

      const locationLines = location
        ? pdf.splitTextToSize(
            `Location: ${location}`,
            contentWidth - 8
          )
        : [];

      const dateLines = date
        ? pdf.splitTextToSize(
            `Date: ${formatReceiptDate(date)}`,
            contentWidth - 8
          )
        : [];

      const blockHeight =
        descriptionLines.length * 5 +
        locationLines.length * 4.5 +
        dateLines.length * 4.5 +
        10;

      ensureSpace(blockHeight);

      pdf.setDrawColor(...colors.border);
      pdf.setFillColor(...colors.cream);
      pdf.roundedRect(
        margin,
        y - 4,
        contentWidth,
        blockHeight,
        2,
        2,
        "FD"
      );

      let eventY = y + 3;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...colors.red);
      pdf.text(
        `${index + 1}. ${descriptionLines[0]}`,
        margin + 4,
        eventY
      );

      eventY += 5;

      if (descriptionLines.length > 1) {
        pdf.setFont("helvetica", "bold");
        pdf.text(
          descriptionLines.slice(1),
          margin + 4,
          eventY
        );

        eventY += (descriptionLines.length - 1) * 5;
      }

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(...colors.muted);

      if (locationLines.length > 0) {
        pdf.text(locationLines, margin + 4, eventY);
        eventY += locationLines.length * 4.5;
      }

      if (dateLines.length > 0) {
        pdf.text(dateLines, margin + 4, eventY);
      }

      y += blockHeight + 5;
    });
  }

  // Disclaimer
  y += 3;
  addSectionTitle("Important Information");

  addWrappedText(
    "This tracking report is generated by TrackAllInOne using information returned by the tracking service. It is not an official courier receipt, proof of payment, proof of booking, or independent proof of delivery. Shipment information may change, may be incomplete, and depends on the tracking provider and courier."
  );

  // Footer on every page
  const totalPages = pdf.internal.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    pdf.setPage(page);

    pdf.setDrawColor(...colors.border);
    pdf.line(
      margin,
      pageHeight - 15,
      pageWidth - margin,
      pageHeight - 15
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(...colors.muted);

    pdf.text(
      "TrackAllInOne | www.trackallinone.com",
      margin,
      pageHeight - 9
    );

    pdf.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 9,
      { align: "right" }
    );
  }

  const safeTrackingNumber =
    String(trackingNumber)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 60) || "shipment";

  pdf.save(`TrackAllInOne-Receipt-${safeTrackingNumber}.pdf`);
}

export default function Home() {
 const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);


  const shipmentStatus = trackingResult
    ? getStatus(trackingResult)
    : null;

  const trackingEvents = trackingResult
    ? getEvents(trackingResult)
    : [];

  const displayedStatus = trackingResult
    ? getStatusText(trackingResult)
    : "";

  const displayedCourier = trackingResult
  ? getCourierName(trackingResult)
  : "";
  const handleDownloadReceipt = () => {
    if (!trackingResult) return;

    try {
      downloadTrackingReceipt({
        trackingNumber: trackingNumber.trim(),
        courierName: displayedCourier,
        status: displayedStatus,
        events: trackingEvents,
      });
    } catch (downloadError) {
      console.error("Receipt generation failed:", downloadError);
      setError(
        "We couldn't generate the PDF receipt. Please try tracking the shipment again."
      );
    }
  };

  const getOfficialTrackingUrl = () => {
    if (!courier?.trackingUrl) {
      return null;
    }

    if (courier.method === "url") {
      return courier.trackingUrl.replace(
        "{trackingNumber}",
        encodeURIComponent(trackingNumber.trim())
      );
    }

    return courier.trackingUrl;
  };

  const openOfficialTracking = () => {
    const url = getOfficialTrackingUrl();

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      setError(
        "An official tracking link is not available for this courier."
      );
    }
  };

  const handleTrack = async () => {
    const cleanTrackingNumber = trackingNumber.trim();

    if (!cleanTrackingNumber) {
      setError("Please enter your tracking number.");
      setTrackingResult(null);
      return;
    }

    setError("");
    setTrackingResult(null);
    setLoading(true);
    

    try {
      const response = await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingNumber: cleanTrackingNumber,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || result.success !== true) {
        setError(
          result?.message ||
            "We couldn't retrieve tracking information. Please try again."
        );
        return;
      }

      setTrackingResult(result);
    } catch {
      setError(
        "Unable to connect to the tracking service. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      {/* HERO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Universal Shipment Tracking
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Track Your Shipment
            <br />
            <span className="text-[#7A1717]">
              All In One Place
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#625B55]">
            Track packages, parcels, and shipments from major
            courier and postal services. Enter your tracking
            number to check available shipment information
            through our tracking service.
          </p>
        </div>

        {/* TRACKING FORM */}

        <div id="tracking" className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-xl md:p-8">

  {/* TRACKING NUMBER */}
  <div>
    <label
      htmlFor="tracking-number"
      className="mb-2 block text-left text-sm font-semibold"
    >
      Tracking Number
    </label>

    <input
      id="tracking-number"
      type="text"
      value={trackingNumber}
      onChange={(event) => {
        setTrackingNumber(event.target.value);
        setError("");
        setTrackingResult(null);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !loading) {
          handleTrack();
        }
      }}
      placeholder="Enter your tracking number"
      autoComplete="off"
      maxLength={100}
      className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-4 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
    />
  </div>

  {/* TRACK BUTTON */}
  <button
    type="button"
    onClick={handleTrack}
    disabled={loading}
    className="mt-6 w-full rounded-xl bg-[#7A1717] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#941F1F] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? "CHECKING SHIPMENT..." : "TRACK SHIPMENT"}
  </button>

  <p className="mt-3 text-center text-sm text-[#625B55]">
    Our tracking service will attempt to identify your courier automatically.
  </p>

  {/* ERROR MESSAGE */}
  {error && (
    <div
      role="alert"
      className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5"
    >
      <h2 className="font-bold text-red-800">
        Tracking information unavailable
      </h2>

      <p className="mt-2 text-sm leading-6 text-red-800">
        {error}
      </p>
    </div>
  )}

  {/* TRACKING RESULTS */}
  {trackingResult && (
    <section
      aria-live="polite"
      className="mt-8 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-5"
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-[#7A1717]">
        Tracking Results
      </p>

      <h2 className="mt-2 break-words text-xl font-bold">
        Shipment {trackingNumber.trim()}
      </h2>

      <p className="mt-2 text-sm text-[#625B55]">
        Courier:{" "}
        <span className="font-semibold text-[#111111]">
          {displayedCourier}
        </span>
      </p>

      {/* CURRENT STATUS */}
      <div className="mt-5 rounded-xl border border-[#E5DCD0] bg-white p-4">
        <p className="text-sm text-[#625B55]">
          Current Status
        </p>

        <p className="mt-1 break-words text-lg font-bold text-[#7A1717]">
          {displayedStatus}
        </p>
      </div>

      {/* TRACKING HISTORY */}
      {trackingEvents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">
            Tracking History
          </h3>

          <ol className="mt-4 space-y-4">
            {trackingEvents.map((event, index) => {
              const eventStatus = getEventValue(event, [
                "status",
                "description",
                "event",
                "message",
                "activity",
              ]);

              const location = getEventValue(event, [
                "location",
                "city",
                "place",
                "address",
              ]);

              const date = getEventValue(event, [
                "date",
                "datetime",
                "timestamp",
                "time",
                "createdAt",
                "created_at",
              ]);

              return (
                <li
                  key={`${date}-${index}`}
                  className="relative border-l-2 border-[#D8B8A7] pb-2 pl-5 last:border-l-0"
                >
                  <span className="absolute -left-[6px] top-1 h-2.5 w-2.5 rounded-full bg-[#7A1717]" />

                  <p className="font-semibold">
                    {eventStatus || "Shipment update"}
                  </p>

                  {location && (
                    <p className="mt-1 text-sm text-[#625B55]">
                      {location}
                    </p>
                  )}

                  {date && (
                    <p className="mt-1 text-xs text-[#625B55]">
                      {date}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* NO STATUS OR HISTORY */}
      {!shipmentStatus && trackingEvents.length === 0 && (
        <p className="mt-4 text-sm leading-6 text-[#625B55]">
          The service returned tracking data, but its status or event history could not be identified in the expected fields.
        </p>
      )}

      {/* DOWNLOAD PDF RECEIPT */}
      <button
        type="button"
        onClick={handleDownloadReceipt}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7A1717] px-5 py-4 font-bold text-white transition hover:bg-[#941F1F] active:scale-[0.99]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>

        Download Tracking Receipt (PDF)
      </button>

      <p className="mt-2 text-center text-xs leading-5 text-[#625B55]">
        Save or print a report of the tracking information returned by the tracking service.
      </p>
    </section>
  )}
</div>

        {/* GUIDES */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <p className="mb-4 text-[#625B55]">
            Need help tracking your parcel?
          </p>

          <a
            href="/guides"
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#7A1717] bg-white px-8 py-3 font-bold text-[#7A1717] transition hover:bg-[#7A1717] hover:text-white"
          >
            Explore Tracking Guides →
          </a>
        </div>
      </section>

      {/* HOW TRACKING WORKS */}
     <section className="border-t border-[#E5DCD0] bg-[#FFF8ED] px-6 py-16">
  <div className="mx-auto max-w-5xl">
    <h2 className="text-center text-3xl font-bold">
      How Shipment Tracking Works
    </h2>

    <p className="mx-auto mt-4 max-w-3xl text-center text-[#625B55]">
      Track your shipment by entering its tracking number.
      Our tracking service will attempt to identify the courier
      automatically and retrieve the available shipment information.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
        <h3 className="text-xl font-bold">
          1. Enter Your Tracking Number
        </h3>
        <p className="mt-3 leading-7 text-[#625B55]">
          Enter the tracking number provided by your sender,
          online store, courier, or postal service.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
        <h3 className="text-xl font-bold">
          2. Automatic Courier Detection
        </h3>
        <p className="mt-3 leading-7 text-[#625B55]">
          Our tracking service attempts to identify the courier
          associated with your tracking number and retrieve
          the shipment details.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
        <h3 className="text-xl font-bold">
          3. View and Save Results
        </h3>
        <p className="mt-3 leading-7 text-[#625B55]">
          Review the available shipment status and tracking
          history, then download a PDF tracking report for
          your records.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* COURIER DIRECTORY */}
      <section
        id="couriers"
        className="border-t border-[#E5DCD0] bg-white px-6 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">
            Supported Courier Tracking Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-[#625B55]">
            Find courier and postal service tracking pages in
            one convenient directory.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
{couriers.map((item) => (
  <div
    key={item.id}
    className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-5"
  >
    <h3 className="font-bold">{item.name}</h3>

    <p className="mt-1 text-sm text-[#625B55]">
      {item.country}
    </p>

    <p className="mt-3 text-sm font-medium text-[#7A1717]">
      Listed courier service
    </p>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#FFF8ED] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            About TrackAllInOne
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#625B55]">
            TrackAllInOne helps users find shipment tracking
            information and official tracking pages for courier
            and postal services.
          </p>

          <p className="mt-4 text-[#625B55]">
            Our goal is to make shipment tracking simpler by
            bringing multiple courier services together in one
            convenient place.
          </p>

          <p className="mt-4 text-[#625B55]">
            TrackAllInOne is an independent tracking directory.
            Shipment data availability depends on the tracking
            provider and the relevant courier.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
