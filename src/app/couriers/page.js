import Link from "next/link";
import couriers from "@/data/couriers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Courier Tracking Directory | TrackAllInOne",
  description:
    "Find and track major courier and postal services including TCS, DHL, FedEx, UPS, USPS, Royal Mail, and more. Access official shipment tracking services through TrackAllInOne.",
  alternates: {
    canonical: "https://www.trackallinone.com/couriers",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Courier Tracking Directory | TrackAllInOne",
    description:
      "Find major courier and postal services and access their official shipment tracking services through TrackAllInOne.",
    url: "https://www.trackallinone.com/couriers",
    siteName: "TrackAllInOne",
    type: "website",
    images: [
      {
        url: "/TRACK.png",
        width: 1200,
        height: 630,
        alt: "TrackAllInOne Courier Tracking Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courier Tracking Directory | TrackAllInOne",
    description:
      "Find major courier and postal services and access their official shipment tracking services through TrackAllInOne.",
    images: ["/TRACK.png"],
  },
};

export default function CouriersPage() {
  const pakistanCouriers = couriers.filter(
    (courier) => courier.country === "Pakistan"
  );

  const internationalCouriers = couriers.filter(
    (courier) => courier.country !== "Pakistan"
  );

  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">

      <Header />

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Courier Directory
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Courier Tracking Services
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#625B55]">
            Find major courier and postal services from around the
            world and access their official shipment tracking
            websites through TrackAllInOne.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            Pakistan Courier Tracking
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-[#625B55]">
            Find tracking access for major courier and delivery
            services operating in Pakistan. Select a courier below
            to visit its official tracking service.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pakistanCouriers.map((courier) => (
              <Link
                key={courier.id}
                href={`/couriers/${courier.id}`}
                className="rounded-2xl border border-[#E5DCD0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#7A1717] hover:shadow-lg"
              >
                <h3 className="text-xl font-bold">
                  {courier.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#625B55]">
                  Access official {courier.name} shipment tracking
                  information.
                </p>

                <span className="mt-5 inline-block font-semibold text-[#7A1717]">
                  Track Shipment →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5DCD0] bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            International Courier Tracking
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-[#625B55]">
            Access tracking pages for major international courier
            companies and postal services. Choose your courier to
            find its official shipment tracking service.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {internationalCouriers.map((courier) => (
              <Link
                key={courier.id}
                href={`/couriers/${courier.id}`}
                className="rounded-2xl border border-[#E5DCD0] bg-[#FFF8ED] p-6 transition hover:-translate-y-1 hover:border-[#7A1717] hover:shadow-lg"
              >
                <h3 className="text-xl font-bold">
                  {courier.name}
                </h3>

                <p className="mt-2 text-sm text-[#625B55]">
                  {courier.country}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#625B55]">
                  Find official {courier.name} tracking access and
                  shipment information.
                </p>

                <span className="mt-5 inline-block font-semibold text-[#7A1717]">
                  Track Shipment →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8ED] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">
            Track Shipments From Major Couriers
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
              <h3 className="text-xl font-bold">
                Find Your Courier
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">
                Choose your courier from our growing directory of
                major courier and postal services.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
              <h3 className="text-xl font-bold">
                Access Official Tracking
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">
                TrackAllInOne helps you quickly reach the courier's
                official shipment tracking service.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5DCD0] bg-white p-6">
              <h3 className="text-xl font-bold">
                Check Shipment Status
              </h3>

              <p className="mt-3 leading-7 text-[#625B55]">
                Shipment status and tracking information are
                provided directly by the relevant courier service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
