import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "About TrackAllInOne",
  description:
    "Learn about TrackAllInOne, a universal shipment tracking directory that helps users access official courier tracking services in one place.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">

      {/* HEADER */}
        <Header />

      {/* HERO */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            About Us
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            About TrackAllInOne
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#625B55]">
            A simple way to find and access official shipment
            tracking services from major courier and postal
            companies around the world.
          </p>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">

            {/* WHAT IS TRACKALLINONE */}
            <h2 className="text-3xl font-bold">
              What is TrackAllInOne?
            </h2>

            <p className="mt-5 leading-8 text-[#625B55]">
              TrackAllInOne is a universal shipment tracking
              directory designed to make courier tracking easier.
              Instead of searching for a courier's official
              tracking website every time you need to check a
              shipment, you can find major courier and postal
              services in one convenient place.
            </p>

            <p className="mt-4 leading-8 text-[#625B55]">
              Our platform helps users quickly identify their
              courier, enter or use their tracking information,
              and access the courier's official tracking service.
            </p>

            {/* OUR GOAL */}
            <div className="mt-12">

              <h2 className="text-3xl font-bold">
                Our Goal
              </h2>

              <p className="mt-5 leading-8 text-[#625B55]">
                Our goal is to simplify shipment tracking for
                people who receive and send packages through
                different courier and postal companies.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Whether you are tracking a domestic shipment or
                an international delivery, TrackAllInOne aims to
                provide a convenient starting point for finding
                the appropriate official tracking service.
              </p>

            </div>

            {/* HOW IT WORKS */}
            <div className="mt-12">

              <h2 className="text-3xl font-bold">
                How TrackAllInOne Works
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-3">

                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">

                  <div className="text-2xl font-bold text-[#7A1717]">
                    01
                  </div>

                  <h3 className="mt-3 text-xl font-bold">
                    Select a Courier
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Find your courier from our growing directory
                    of major courier and postal services.
                  </p>

                </div>

                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">

                  <div className="text-2xl font-bold text-[#7A1717]">
                    02
                  </div>

                  <h3 className="mt-3 text-xl font-bold">
                    Enter Tracking Information
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Provide your shipment tracking number when
                    required by the courier.
                  </p>

                </div>

                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">

                  <div className="text-2xl font-bold text-[#7A1717]">
                    03
                  </div>

                  <h3 className="mt-3 text-xl font-bold">
                    Check Your Shipment
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Access the courier's official tracking service
                    to view the latest available shipment status.
                  </p>

                </div>

              </div>

            </div>

            {/* INDEPENDENT PLATFORM */}
            <div className="mt-12 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">

              <h2 className="text-2xl font-bold">
                Independent Tracking Directory
              </h2>

              <p className="mt-4 leading-7 text-[#625B55]">
                TrackAllInOne is an independent tracking directory.
                We are not affiliated with, owned by, or operated
                by the courier and postal companies listed on this
                website.
              </p>

              <p className="mt-4 leading-7 text-[#625B55]">
                Shipment information and delivery status are
                provided by the respective courier or postal
                service. For the most accurate and current
                information, users should rely on the official
                tracking system of their courier.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
        <Footer />

    </main>
  );
}