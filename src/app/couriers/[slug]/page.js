import Link from "next/link";
import { notFound } from "next/navigation";
import couriers from "@/data/couriers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export function generateStaticParams() {
  return couriers.map((courier) => ({
    slug: courier.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const courier = couriers.find(
    (item) => item.id === slug
  );

  if (!courier) {
    return {
      title: "Courier Not Found | TrackAllInOne",
      description:
        "The requested courier tracking page could not be found.",
    };
  }

  const title = `${courier.name} Tracking | TrackAllInOne`;

  const description = `Track your ${courier.name} shipment and quickly access the official ${courier.name} tracking service through TrackAllInOne.`;

  const canonicalUrl = `https://www.trackallinone.com/couriers/${courier.id}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "TrackAllInOne",
      type: "website",
      images: [
        {
          url: "/TRACK.png",
          width: 1200,
          height: 630,
          alt: `${courier.name} Tracking - TrackAllInOne`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/TRACK.png"],
    },
  };
}

export default async function CourierPage({ params }) {
  const { slug } = await params;

  const courier = couriers.find(
    (item) => item.id === slug
  );

  if (!courier) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/couriers"
            className="font-medium text-[#7A1717] transition hover:text-[#941F1F]"
          >
            ← All Couriers
          </Link>

          <div className="mt-8 rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">
            <p className="font-semibold uppercase tracking-[0.15em] text-[#7A1717]">
              {courier.country}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {courier.name} Tracking
            </h1>

            <p className="mt-5 text-lg leading-8 text-[#625B55]">
              Use TrackAllInOne to access the official{" "}
              {courier.name} shipment tracking service.
            </p>

            <div className="mt-10 rounded-2xl bg-[#FFF8ED] p-6">
              <h2 className="text-2xl font-bold">
                Track Your Shipment
              </h2>

              <p className="mt-3 text-[#625B55]">
                Enter your tracking number on the official{" "}
                {courier.name} tracking service.
              </p>

              <a
                href={courier.trackingUrl.replace(
                  "{trackingNumber}",
                  ""
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-[#7A1717] px-7 py-4 font-bold text-white transition hover:bg-[#941F1F]"
              >
                Track on {courier.name}
              </a>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">
                About {courier.name} Tracking
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                {courier.name} provides shipment tracking services
                for customers who want to check the progress of
                their deliveries. Your tracking number can normally
                be found on your shipping receipt, order confirmation,
                email, SMS notification, or shipping label.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne provides a convenient way to find the
                official tracking service. Tracking information and
                shipment status are provided by the courier itself.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">
                How to Track Your {courier.name} Shipment
              </h2>

              <ol className="mt-5 space-y-3 text-[#625B55]">
                <li>
                  <span className="font-semibold text-[#111111]">
                    1.
                  </span>{" "}
                  Find your {courier.name} tracking number.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    2.
                  </span>{" "}
                  Click the official tracking button above.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    3.
                  </span>{" "}
                  Enter your tracking number on the courier's
                  official website.
                </li>

                <li>
                  <span className="font-semibold text-[#111111]">
                    4.
                  </span>{" "}
                  View the latest shipment information provided
                  by the courier.
                </li>
              </ol>
            </div>

            <div className="mt-10 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-5">
              <p className="text-sm leading-6 text-[#625B55]">
                TrackAllInOne is an independent tracking directory
                and is not affiliated with {courier.name}. For the
                most accurate shipment information, always rely on the
                courier's official tracking system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
