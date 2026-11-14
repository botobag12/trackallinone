
"use client";

import { useEffect, useState } from "react";
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
  pdf.text("Generated tracking information", margin, 34);

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
  const [analyticsRequestId, setAnalyticsRequestId] = useState(null);

  // Manual carrier selection
  const [needsCarrierSelection, setNeedsCarrierSelection] =
    useState(false);
  const [carrierQuery, setCarrierQuery] = useState("");
  const [carrierOptions, setCarrierOptions] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [carrierSearchLoading, setCarrierSearchLoading] =
    useState(false);

  // Search the carrier catalog while the user types.
  useEffect(() => {
    const query = carrierQuery.trim();

    if (!needsCarrierSelection || query.length < 2) {
      setCarrierOptions([]);
      setCarrierSearchLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setCarrierSearchLoading(true);

      try {
        const response = await fetch(
          `/api/carriers?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (response.ok && result?.success) {
          setCarrierOptions(result.carriers || []);
        } else {
          setCarrierOptions([]);
        }
      } catch (searchError) {
        if (searchError.name !== "AbortError") {
          setCarrierOptions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarrierSearchLoading(false);
        }
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [carrierQuery, needsCarrierSelection]);

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

 
const handleTrack = async (carrierId = null) => {
  const cleanTrackingNumber = trackingNumber.trim();

  if (!cleanTrackingNumber) {
    setError("Please enter your tracking number.");
    setTrackingResult(null);
    return;
  }

  // Automatic tracking starts a new logical request.
  // Manual attempts reuse the previous analytics ID.
  const currentAnalyticsRequestId = carrierId
    ? analyticsRequestId
    : null;

  if (!carrierId) {
    setAnalyticsRequestId(null);
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
        ...(carrierId ? { carrier: carrierId } : {}),
        ...(currentAnalyticsRequestId
          ? { analyticsRequestId: currentAnalyticsRequestId }
          : {}),
      }),
    });

    const result = await response.json().catch(() => null);

    // Preserve the ID even when tracking fails.
    // The next manual attempt will reuse it.
    if (result?.analyticsRequestId) {
      setAnalyticsRequestId(result.analyticsRequestId);
    }

    if (!response.ok || !result || result.success !== true) {
      setError(
        result?.message ||
          "We couldn't retrieve tracking information. Please try again."
      );

      if (result?.needsCarrierSelection || carrierId) {
        setNeedsCarrierSelection(true);
      }

      return;
    }

    setTrackingResult(result);
    setAnalyticsRequestId(null);
    setNeedsCarrierSelection(false);
    setSelectedCarrier(null);
    setCarrierQuery("");
    setCarrierOptions([]);
  } catch {
    setError(
      "Unable to connect to the tracking service. Please check your connection and try again."
    );
  } finally {
    setLoading(false);
  }
};


 const handleTrackingNumberChange = (value) => {
  setTrackingNumber(value);
  setAnalyticsRequestId(null);
  setError("");
  setTrackingResult(null);
  setNeedsCarrierSelection(false);
  setSelectedCarrier(null);
  setCarrierQuery("");
  setCarrierOptions([]);
};

  const handleSelectCarrier = (carrier) => {
    setSelectedCarrier(carrier);
    setCarrierQuery(carrier.name);
    setCarrierOptions([]);
    setError("");
  };

  
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8ED] text-[#211D1A]">
      <Header />

      {/* HERO AND TRACKING */}
      <section className="relative px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#EAD5C8]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[#F2E5D4]/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          
<div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
  {/* Hero text */}
  <div className="text-center lg:text-left">
    <div className="inline-flex items-center gap-2 rounded-full border border-[#E9D7CA] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#7A1717] shadow-sm sm:text-sm">
      <span className="h-2 w-2 rounded-full bg-[#7A1717]" />
      One place. Multiple courier services.
    </div>

    <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
      Your parcels,
      <br />
      <span className="text-[#7A1717]">one simple track.</span>
    </h1>

    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#71665E] sm:text-lg sm:leading-8 lg:mx-0">
      Follow your shipment journey from one convenient place.
      Find courier updates without jumping between different
      tracking websites.
    </p>

    <a
      href="#tracking"
      className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#7A1717] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7A1717]/15 transition hover:-translate-y-1 hover:bg-[#5F1010]"
    >
      Track a Shipment
      <span aria-hidden="true">→</span>
    </a>

    <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[#71665E] lg:justify-start">
      <span>✓ Multiple couriers</span>
      <span>✓ Shipment updates</span>
      <span>✓ Simple tracking</span>
    </div>
  </div>

  {/* Cartoon-style tracking illustration */}
  <div className="relative mx-auto w-full max-w-[520px]">
    <div className="absolute inset-8 rounded-full bg-[#EEDBD0]/70 blur-3xl" />

    <div className="relative overflow-hidden rounded-[32px] border border-[#EAD8CA] bg-gradient-to-br from-[#FFFDF9] to-[#F5E6DA] p-5 shadow-[0_24px_65px_rgba(62,35,22,0.10)] sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7A1717]">
          Your delivery journey
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#7A1717] shadow-sm">
          Live tracking
        </span>
      </div>

      <svg
        viewBox="0 0 520 330"
        className="mt-3 w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration of a parcel delivery van travelling along a route between locations"
      >
        {/* Decorative clouds */}
        <path d="M62 75c0-10 8-18 18-18 5-13 24-15 32-3 12-2 21 7 21 18H62Z" fill="#F0DCD0"/>
        <path d="M390 67c0-8 7-15 15-15 5-10 20-12 27-2 10-2 18 5 18 17h-60Z" fill="#F0DCD0"/>

        {/* Route */}
        <path
          d="M75 220 C135 135 190 145 250 205 S365 260 445 145"
          stroke="#C99D83"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="9 12"
        />

        {/* Route location pins */}
        <circle cx="75" cy="220" r="16" fill="#7A1717"/>
        <circle cx="75" cy="220" r="6" fill="white"/>
        <circle cx="445" cy="145" r="16" fill="#7A1717"/>
        <circle cx="445" cy="145" r="6" fill="white"/>

        {/* Parcel */}
        <g transform="translate(180 85)">
          <path d="M0 32 65 0l67 32-66 35L0 32Z" fill="#D9A77F"/>
          <path d="M0 32v77l66 36V67L0 32Z" fill="#C68B61"/>
          <path d="M66 67v78l66-36V32L66 67Z" fill="#E7B88F"/>
          <path d="m65 0 1 67m-66-35 66 35 66-35" stroke="#9E6747" strokeWidth="3" strokeLinejoin="round"/>
          <path d="m48 24 35 19" stroke="#FFF0DD" strokeWidth="9" strokeLinecap="round"/>
          <path d="M66 67v78" stroke="#FFF0DD" strokeWidth="7"/>
          <path d="M23 88v17l25 14V102L23 88Z" fill="#F8E5D2" opacity=".9"/>
        </g>

        {/* Delivery van */}
        <g transform="translate(305 205)">
          <path d="M0 17c0-5 4-9 9-9h88c5 0 9 4 9 9v43H0V17Z" fill="#7A1717"/>
          <path d="M106 28h36l24 24v8h-60V28Z" fill="#A94336"/>
          <path d="M117 35h20l14 16h-34V35Z" fill="#F9E8D9"/>
          <path d="M11 18h78v34H11V18Z" fill="#FFF8ED"/>
          <path d="M22 29h56" stroke="#D9B7A2" strokeWidth="5" strokeLinecap="round"/>
          <path d="M22 40h39" stroke="#D9B7A2" strokeWidth="5" strokeLinecap="round"/>
          <circle cx="33" cy="63" r="13" fill="#342C27"/>
          <circle cx="33" cy="63" r="6" fill="#F2E5D4"/>
          <circle cx="137" cy="63" r="13" fill="#342C27"/>
          <circle cx="137" cy="63" r="6" fill="#F2E5D4"/>
        </g>

        {/* Small decorative stars */}
        <path d="m145 65 4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9Z" fill="#D6A77F"/>
        <path d="m390 105 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#D6A77F"/>
        <circle cx="115" cy="145" r="4" fill="#D6A77F"/>
        <circle cx="370" cy="75" r="4" fill="#D6A77F"/>
      </svg>

      {/* Small tracking status card */}
      <div className="relative mx-auto -mt-1 flex max-w-sm items-center gap-3 rounded-2xl border border-[#EAD8CA] bg-white p-4 shadow-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7EAE5] text-lg">
          📦
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#82766D]">
            Shipment journey
          </p>
          <p className="mt-1 text-sm font-extrabold text-[#342C27]">
            From pickup to delivery
          </p>
        </div>
        <span className="rounded-full bg-[#F1E7DA] px-2.5 py-1 text-xs font-bold text-[#7A1717]">
          Track
        </span>
      </div>
    </div>
  </div>
</div>


          {/* TRACKING CARD */}
          <div
  id="tracking"
  className="mx-auto mt-10 max-w-2xl scroll-mt-28 rounded-[28px] border border-[#EDE1D5] bg-white p-5 shadow-[0_20px_70px_rgba(62,35,22,0.10)] sm:p-7"
>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7EAE5] text-[#7A1717]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h11v11H3zM14 11h4l3 3v4h-7z"
                  />
                  <circle cx="7.5" cy="18" r="2" />
                  <circle cx="17.5" cy="18" r="2" />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Track your shipment
                </h2>
                <p className="mt-1 text-sm text-[#82766D]">
                  Start with your tracking number.
                </p>
              </div>
            </div>

            <label
              htmlFor="tracking-number"
              className="mb-2 block text-sm font-bold text-[#342C27]"
            >
              Tracking number
            </label>

           
<div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
  <input
    id="tracking-number"
    type="text"
    value={trackingNumber}
    onChange={(event) =>
      handleTrackingNumberChange(event.target.value)
    }
    onKeyDown={(event) => {
      if (event.key === "Enter" && !loading) {
        handleTrack();
      }
    }}
    placeholder="Enter tracking number"
    autoComplete="off"
    maxLength={100}
    className="min-w-0 rounded-2xl border border-[#E8DED3] bg-[#FFFCF8] px-4 py-4 text-base text-[#211D1A] outline-none transition placeholder:text-[#A69A90] hover:border-[#D8C5B6] focus:border-[#7A1717] focus:ring-4 focus:ring-[#7A1717]/10"
  />

  <button
    type="button"
    onClick={() => handleTrack()}
    disabled={loading}
    className="flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#7A1717] px-7 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(122,23,23,0.16)] transition hover:-translate-y-0.5 hover:bg-[#5F1010] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
  >
    {loading ? "Checking..." : "Track Shipment"}
    {!loading && <span aria-hidden="true">→</span>}
  </button>
</div>


            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#82766D]">
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[#7A1717]">✓</span>
                Automatic courier detection
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="text-[#7A1717]">✓</span>
                Manual courier selection
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                    !
                  </span>
                  <div>
                    <h3 className="font-bold text-red-900">
                      Tracking information unavailable
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-red-800">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MANUAL COURIER SELECTION */}
            {needsCarrierSelection && !trackingResult && (
              <div className="mt-7 rounded-2xl border border-[#E8D9CD] bg-[#FFFCF8] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7EAE5] text-[#7A1717]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path
                        strokeLinecap="round"
                        d="m16 16 4 4"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Let's find your courier
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#82766D]">
                      Automatic detection wasn't successful.
                      Search and select your courier below.
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="carrier-search"
                  className="mb-2 mt-5 block text-sm font-bold"
                >
                  Search courier
                </label>

                <input
                  id="carrier-search"
                  type="text"
                  value={carrierQuery}
                  onChange={(event) => {
                    setCarrierQuery(event.target.value);
                    setSelectedCarrier(null);
                  }}
                  placeholder="Search TCS, DHL, FedEx..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-[#E8DED3] bg-white px-4 py-3.5 outline-none transition placeholder:text-[#A69A90] focus:border-[#7A1717] focus:ring-4 focus:ring-[#7A1717]/10"
                />

                {carrierSearchLoading && (
                  <p className="mt-3 text-sm text-[#82766D]">
                    Searching available couriers...
                  </p>
                )}

                {!carrierSearchLoading &&
                  carrierQuery.trim().length >= 2 &&
                  carrierOptions.length === 0 &&
                  !selectedCarrier && (
                    <p className="mt-3 text-sm text-[#82766D]">
                      No matching courier found. Try another name.
                    </p>
                  )}

                {carrierOptions.length > 0 && !selectedCarrier && (
                  <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-[#E8DED3] bg-white">
                    {carrierOptions.map((carrier) => (
                      <button
                        key={carrier.id}
                        type="button"
                        onClick={() => handleSelectCarrier(carrier)}
                        className="flex w-full items-center justify-between gap-3 border-b border-[#F0E8DF] px-4 py-3.5 text-left transition last:border-b-0 hover:bg-[#FFF8ED]"
                      >
                        <span className="min-w-0">
                          <span className="block font-bold text-[#342C27]">
                            {carrier.name}
                          </span>
                          <span className="mt-1 block text-xs text-[#82766D]">
                            {carrier.countries?.join(", ") || "International"}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm font-bold text-[#7A1717]">
                          Select →
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedCarrier && (
                  <div className="mt-4 rounded-xl border border-[#DCC4B5] bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#82766D]">
                          Selected courier
                        </p>
                        <p className="mt-1 font-bold text-[#7A1717]">
                          {selectedCarrier.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCarrier(null);
                          setCarrierQuery("");
                          setError("");
                        }}
                        className="text-sm font-semibold text-[#82766D] underline hover:text-[#7A1717]"
                      >
                        Change
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTrack(selectedCarrier.id)}
                      disabled={loading}
                      className="mt-4 w-full rounded-xl bg-[#7A1717] px-5 py-3.5 font-bold text-white transition hover:bg-[#5F1010] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading
                        ? "Checking shipment..."
                        : `Track with ${selectedCarrier.name}`}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TRACKING RESULTS */}
            {trackingResult && (
              <section
                aria-live="polite"
                className="mt-8 overflow-hidden rounded-2xl border border-[#E8DED3] bg-[#FFFCF8]"
              >
                <div className="border-b border-[#E8DED3] bg-white p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#7A1717]">
                      Shipment results
                    </p>
                    <span className="rounded-full bg-[#F1E7DA] px-3 py-1.5 text-xs font-bold text-[#62564D]">
                      Tracking response received
                    </span>
                  </div>

                  <h2 className="mt-3 break-all text-xl font-extrabold sm:text-2xl">
                    {trackingNumber.trim()}
                  </h2>

                  <p className="mt-2 text-sm text-[#82766D]">
                    Courier:{" "}
                    <span className="font-bold text-[#342C27]">
                      {displayedCourier}
                    </span>
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="rounded-2xl border border-[#E8D9CD] bg-white p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#82766D]">
                      Current shipment status
                    </p>

                    <p className="mt-2 break-words text-xl font-extrabold text-[#7A1717]">
                      {displayedStatus}
                    </p>
                  </div>

                  {trackingEvents.length > 0 && (
                    <div className="mt-7">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-extrabold">
                          Shipment journey
                        </h3>
                        <span className="rounded-full bg-[#F1E7DA] px-3 py-1 text-xs font-bold text-[#62564D]">
                          {trackingEvents.length} updates
                        </span>
                      </div>

                      <ol className="mt-6 space-y-5">
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
                              className="relative border-l-2 border-[#E4CFC1] pb-2 pl-6 last:border-l-0"
                            >
                              <span
                                className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[#FFFCF8] ${
                                  index === 0
                                    ? "bg-[#7A1717] ring-4 ring-[#F7EAE5]"
                                    : "bg-[#C9A994]"
                                }`}
                              />

                              <p className="font-bold text-[#342C27]">
                                {eventStatus || "Shipment update"}
                              </p>

                              {location && (
                                <p className="mt-1 text-sm text-[#71665E]">
                                  {location}
                                </p>
                              )}

                              {date && (
                                <p className="mt-1 text-xs text-[#94877D]">
                                  {date}
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}

                  {!shipmentStatus && trackingEvents.length === 0 && (
                    <p className="mt-5 rounded-xl bg-white p-4 text-sm leading-6 text-[#71665E]">
                      The tracking service returned information, but
                      we could not identify a current status or event
                      history in the response.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleDownloadReceipt}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7A1717] px-5 py-4 font-bold text-white transition hover:bg-[#5F1010] active:scale-[0.99]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                    Download Tracking Report (PDF)
                  </button>

                  <p className="mt-3 text-center text-xs leading-5 text-[#82766D]">
                    This is a generated tracking report, not an official
                    courier receipt or proof of delivery.
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* GUIDES LINK */}
          
{/* QUICK LINKS */}
<div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
  <a
    href="/couriers"
    className="group flex items-center gap-4 rounded-2xl border border-[#E9DED2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D6B7A5] hover:shadow-lg"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7EAE5] text-2xl transition group-hover:bg-[#7A1717]">
      <span className="transition group-hover:scale-110">🚚</span>
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-extrabold text-[#342C27] group-hover:text-[#7A1717]">
        Explore Couriers
      </h3>
      <p className="mt-1 text-xs leading-5 text-[#82766D]">
        Find supported courier services
      </p>
    </div>
    <span className="text-lg font-bold text-[#7A1717]">→</span>
  </a>

  <a
    href="/guides"
    className="group flex items-center gap-4 rounded-2xl border border-[#E9DED2] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D6B7A5] hover:shadow-lg"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7EAE5] text-2xl transition group-hover:bg-[#7A1717]">
      <span className="transition group-hover:scale-110">📖</span>
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="font-extrabold text-[#342C27] group-hover:text-[#7A1717]">
        Tracking Guides
      </h3>
      <p className="mt-1 text-xs leading-5 text-[#82766D]">
        Learn how to track your parcel
      </p>
    </div>
    <span className="text-lg font-bold text-[#7A1717]">→</span>
  </a>
</div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
  id="how-it-works"
  className="border-y border-[#EEE2D6] bg-white px-4 py-20 sm:px-6"
>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
              Simple by design
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tracking made easier
            </h2>
            <p className="mt-4 leading-7 text-[#71665E]">
              No complicated process. Just enter your tracking number,
              identify your courier and review the available updates.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Enter your number",
                description:
                  "Use the tracking number provided by your sender, online store or courier.",
                icon: "01",
              },
              {
                number: "02",
                title: "Find your courier",
                description:
                  "We attempt automatic courier detection. You can also select a courier manually.",
                icon: "02",
              },
              {
                number: "03",
                title: "View your updates",
                description:
                  "Check the available shipment status and history, and save a PDF report.",
                icon: "03",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-[#EEE2D6] bg-[#FFFCF8] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D9B8A6] hover:shadow-[0_15px_40px_rgba(62,35,22,0.07)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7EAE5] text-sm font-extrabold text-[#7A1717] transition group-hover:bg-[#7A1717] group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#71665E]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURIER DIRECTORY */}
      
<section
  id="couriers"
  className="scroll-mt-24 bg-[#FFF8ED] px-4 py-16 sm:px-6 sm:py-20"
>
  <div className="mx-auto max-w-6xl">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
          Explore services
        </p>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Courier directory
        </h2>

        <p className="mt-3 max-w-xl leading-7 text-[#71665E]">
          Explore courier and postal services listed on
          TrackAllInOne.
        </p>
      </div>

      <a
        href="/couriers"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCC8B8] bg-white px-5 py-3 text-sm font-bold text-[#7A1717] transition hover:border-[#7A1717] hover:bg-[#7A1717] hover:text-white"
      >
        View all couriers →
      </a>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {couriers.map((item, index) => {
        const cardColors = [
          "bg-[#FFF0E5] border-[#F2D8C5]",
          "bg-[#EAF2FF] border-[#D5E2F7]",
          "bg-[#EAF5EB] border-[#D5E8D6]",
          "bg-[#F2ECFF] border-[#E2D8F5]",
          "bg-[#FFF5D9] border-[#F0E4BB]",
          "bg-[#E5F5F3] border-[#CFE8E4]",
        ];

        const iconColors = [
          "bg-[#F8DCC8] text-[#A84C24]",
          "bg-[#D9E7FC] text-[#315E9B]",
          "bg-[#D6EBD8] text-[#347447]",
          "bg-[#E5D9FA] text-[#6946A5]",
          "bg-[#F5E8B9] text-[#8B6A19]",
          "bg-[#D0ECE7] text-[#26776C]",
        ];

        const colorIndex = index % cardColors.length;

        return (
          <a
            key={item.id}
            href={`/couriers/${item.id}`}
            className={`group flex min-h-[118px] flex-col justify-between rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(62,35,22,0.09)] sm:min-h-[135px] sm:p-4 ${cardColors[colorIndex]}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconColors[colorIndex]} transition-transform duration-200 group-hover:scale-110`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h11v11H3zM14 11h4l3 3v4h-7z"
                  />
                  <circle cx="7.5" cy="18" r="2" />
                  <circle cx="17.5" cy="18" r="2" />
                </svg>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wide text-[#8A7B70]">
                Courier
              </span>
            </div>

            <div className="mt-3 min-w-0">
              <h3 className="truncate text-sm font-extrabold text-[#342C27] transition group-hover:text-[#7A1717] sm:text-base">
                {item.name}
              </h3>

              <p className="mt-1 truncate text-xs text-[#82766D]">
                {item.country}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>
</section>


      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-[#E9DED2] bg-white px-4 py-20 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
              About our platform
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Less searching.
              <br />
              More straightforward tracking.
            </h2>

            <p className="mt-5 leading-8 text-[#71665E]">
              TrackAllInOne is an independent shipment tracking
              platform designed to make it easier to find tracking
              information across supported courier and postal services.
            </p>

            <p className="mt-4 leading-8 text-[#71665E]">
              Our goal is to bring useful tracking options together
              in one convenient place, with a simple experience for
              everyday users.
            </p>

            <a
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#7A1717] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#5F1010]"
            >
              Learn more about us
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="relative rounded-[28px] bg-[#F7EAE5] p-6 sm:p-9">
            <div className="rounded-2xl border border-[#E9D7CA] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A1717] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h10"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-extrabold">One convenient place</p>
                  <p className="mt-1 text-xs text-[#82766D]">
                    A simpler tracking experience
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {["Enter tracking number", "Identify courier", "Review available updates"].map(
                  (step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-xl bg-[#FFFCF8] p-3"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7EAE5] text-xs font-extrabold text-[#7A1717]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-[#514943]">
                        {step}
                      </span>
                      <span className="ml-auto text-[#7A1717]">✓</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-6 text-[#82766D]">
              Tracking results depend on the information made available
              by the tracking provider and relevant courier.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="bg-[#7A1717] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Have a parcel to track?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Start with your tracking number and check the shipment
              information available to you.
            </p>
          </div>

          <a
            href="#tracking"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#7A1717] transition hover:-translate-y-0.5 hover:bg-[#FFF8ED]"
          >
            Track Your Parcel
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}


