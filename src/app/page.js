"use client";

import { useState } from "react";
import couriers from "@/data/couriers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function Home() {
  const [courier, setCourier] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showCouriers, setShowCouriers] = useState(false);

  const filteredCouriers = couriers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrack = () => {
    if (!courier) {
      alert("Please select a courier.");
      return;
    }

    if (!trackingNumber.trim()) {
      alert("Please enter your tracking number.");
      return;
    }

    const cleanTrackingNumber = trackingNumber.trim();

    /*
      URL METHOD
      The courier accepts the tracking number
      directly through its URL.
    */

    if (courier.method === "url") {
      const trackingUrl = courier.trackingUrl.replace(
        "{trackingNumber}",
        encodeURIComponent(cleanTrackingNumber)
      );

      window.open(trackingUrl, "_blank");
      return;
    }

    /*
      MANUAL METHOD
      The courier has its own tracking form.
      We open the official tracking page and
      the user enters the number there.
    */

    if (courier.method === "manual") {
      window.open(courier.trackingUrl, "_blank");
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">

      {/* ================= HEADER ================= */}

      <Header />


      {/* ================= HERO ================= */}

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
            courier and postal services around the world. Select
            your courier, enter your tracking number, and quickly
            access the official tracking service.

          </p>

        </div>


        {/* ================= TRACKING BOX ================= */}

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-xl md:p-8">

          {/* Courier Search */}

          <div className="relative">

            <label className="mb-2 block text-left text-sm font-semibold">
              Select Courier
            </label>

            <input
              type="text"
              value={courier ? courier.name : search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCourier(null);
                setShowCouriers(true);
              }}
              onFocus={() => {
                setShowCouriers(true);
              }}
              placeholder="Search for a courier..."
              autoComplete="off"
              className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-4 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
            />


            {/* Courier Dropdown */}

            {showCouriers && filteredCouriers.length > 0 && (

              <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-[#E5DCD0] bg-white shadow-lg">

                {filteredCouriers.map((item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCourier(item);
                      setSearch("");
                      setShowCouriers(false);
                    }}
                    className="block w-full px-4 py-3 text-left transition hover:bg-[#FFF8ED] hover:text-[#7A1717]"
                  >
                    <span className="font-medium">
                      {item.name}
                    </span>

                    <span className="ml-2 text-sm text-[#625B55]">
                      {item.country}
                    </span>
                  </button>

                ))}

              </div>

            )}

            {showCouriers && search && filteredCouriers.length === 0 && (

              <div className="absolute z-20 mt-2 w-full rounded-xl border border-[#E5DCD0] bg-white p-4 text-left text-sm text-[#625B55] shadow-lg">
                No courier found.
              </div>

            )}

          </div>


          {/* Tracking Number */}

          <div className="mt-5">

            <label className="mb-2 block text-left text-sm font-semibold">
              Tracking Number
            </label>

            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => {
                setTrackingNumber(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTrack();
                }
              }}
              placeholder="Enter your tracking number"
              autoComplete="off"
              className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-4 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
            />

          </div>


          {/* Track Button */}

          <button
            type="button"
            onClick={handleTrack}
            className="mt-6 w-full rounded-xl bg-[#7A1717] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#941F1F] active:scale-[0.99]"
          >
            TRACK SHIPMENT
          </button>

        </div>

      </section>


      {/* ================= TRACKING INFORMATION ================= */}

      <section
        className="border-t border-[#E5DCD0] bg-[#FFF8ED] px-6 py-16"
      >

        <div className="mx-auto max-w-5xl">

          <h2 className="text-center text-3xl font-bold">
            How Shipment Tracking Works
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-center text-[#625B55]">

            TrackAllInOne makes it easier to find the official
            tracking service for your shipment. Select your courier,
            enter your tracking number, and access the appropriate
            official tracking website.

          </p>


          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">

              <h3 className="text-xl font-bold">
                1. Select Your Courier
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">

                Choose the courier or postal service handling
                your package from our growing tracking directory.

              </p>

            </div>


            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">

              <h3 className="text-xl font-bold">
                2. Enter Your Tracking Number
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">

                Enter the tracking number provided by the sender,
                online store, courier, or postal service.

              </p>

            </div>


            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">

              <h3 className="text-xl font-bold">
                3. Check Your Shipment
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">

                TrackAllInOne directs you to the official courier
                tracking service where the latest shipment status
                is provided.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= COURIERS ================= */}

      <section
        id="couriers"
        className="border-t border-[#E5DCD0] bg-white px-6 py-16"
      >

        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-3xl font-bold">
            Supported Courier Tracking Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-[#625B55]">

            Track shipments from major courier and postal services
            through one convenient interface. Our directory includes
            courier services from Pakistan and around the world.

          </p>


          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {couriers.map((item) => (

              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCourier(item);
                  setTrackingNumber("");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-5 text-left transition hover:-translate-y-1 hover:border-[#7A1717] hover:shadow-md"
              >

                <h3 className="font-bold">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-[#625B55]">
                  {item.country}
                </p>

                <p className="mt-3 text-sm font-medium text-[#7A1717]">
                  Track {item.name} →
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="bg-[#FFF8ED] px-6 py-16"
      >

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-bold">
            About TrackAllInOne
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#625B55]">

            TrackAllInOne helps users quickly find the official
            tracking service for major courier and postal companies
            around the world.

          </p>

          <p className="mt-4 text-[#625B55]">

            Our goal is to make shipment tracking simpler by
            bringing major courier services together in one
            convenient place.

          </p>

          <p className="mt-4 text-[#625B55]">

            TrackAllInOne is an independent tracking directory.
            Shipment status and tracking information are provided
            directly by the relevant courier or postal service.

          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <Footer />

    </main>
  );
}
