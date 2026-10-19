
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "About TrackAllInOne | Parcel Tracking Made Easier",
  description:
    "Learn how TrackAllInOne helps users track shipments, understand delivery statuses, and find useful courier tracking guides.",
  alternates: {
    canonical: "https://www.trackallinone.com/about",
  },
  openGraph: {
    title: "About TrackAllInOne",
    description:
      "Discover TrackAllInOne's shipment tracking tools, courier information, and practical delivery guides.",
    url: "https://www.trackallinone.com/about",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            About Us
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            About TrackAllInOne
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#625B55]">
            A convenient place to check supported shipments, explore
            courier information, and learn more about parcel delivery.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <article className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">
            <section>
              <h2 className="text-3xl font-bold">
                What Is TrackAllInOne?
              </h2>

              <p className="mt-5 leading-8 text-[#625B55]">
                TrackAllInOne is an independent shipment tracking
                website designed to make it easier to find tracking
                information and learn about courier services. Our
                website brings tracking tools, courier information,
                and practical delivery guides together in one place.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                For supported shipments, visitors can enter a tracking
                number on our homepage and submit a tracking request.
                The request is processed through our tracking provider,
                which returns the shipment information available for
                that tracking number. Availability and detail depend
                on the courier, provider coverage, and shipment data.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our courier pages also provide general information
                about delivery services and explain how users can find
                their tracking numbers. Not every courier listed in
                our directory is necessarily supported by the live
                tracking tool.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">Our Goal</h2>

              <p className="mt-5 leading-8 text-[#625B55]">
                Our goal is to make parcel tracking more convenient
                for online shoppers, individuals, sellers, and
                businesses that regularly send or receive shipments.
                We aim to help users understand tracking results,
                common shipment statuses, and the delivery process.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We continue to improve the website's tracking
                experience and educational resources while making
                clear that shipment information depends on external
                courier and tracking systems.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl bg-[#7A1717] px-6 py-3 font-semibold text-white transition hover:bg-[#941F1F]"
              >
                Track a Shipment
              </Link>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                How TrackAllInOne Works
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
                  <p className="text-2xl font-bold text-[#7A1717]">
                    01
                  </p>
                  <h3 className="mt-3 text-xl font-bold">
                    Find Your Courier
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Explore our courier directory to find information
                    about delivery companies and their services.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
                  <p className="text-2xl font-bold text-[#7A1717]">
                    02
                  </p>
                  <h3 className="mt-3 text-xl font-bold">
                    Submit Your Number
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Visit the homepage, select an available courier,
                    and enter your shipment tracking number.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
                  <p className="text-2xl font-bold text-[#7A1717]">
                    03
                  </p>
                  <h3 className="mt-3 text-xl font-bold">
                    Review the Results
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#625B55]">
                    Review the status and tracking events returned
                    for your shipment, when available.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Tracking Reports and PDF Downloads
              </h2>

              <p className="mt-5 leading-8 text-[#625B55]">
                Where the feature is available, users can download
                a PDF summary of the tracking results displayed by
                TrackAllInOne. The report is generated by our
                website for personal reference and may include the
                tracking number, available status, and tracking
                events.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                A TrackAllInOne PDF report is not an official courier
                document, proof of payment, shipping receipt, or
                confirmation of delivery. Users should contact the
                relevant courier for official documentation.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Tracking Guides and Courier Information
              </h2>

              <p className="mt-5 leading-8 text-[#625B55]">
                Tracking can sometimes be confusing, especially
                when a shipment status has not changed or a parcel
                has not yet appeared in the system. Our educational
                content aims to explain common tracking terms,
                where to find tracking numbers, and steps to take
                when tracking information is unavailable.
              </p>

              <div className="mt-6 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
                <h3 className="text-xl font-bold">
                  Courier Tracking Guides
                </h3>
                <p className="mt-3 leading-7 text-[#625B55]">
                  Read practical guidance about tracking parcels,
                  understanding shipment updates, and troubleshooting
                  common tracking problems.
                </p>
                <Link
                  href="/guides"
                  className="mt-4 inline-flex font-semibold text-[#7A1717] hover:underline"
                >
                  Explore Tracking Guides →
                </Link>
              </div>

              <div className="mt-5 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
                <h3 className="text-xl font-bold">
                  Information for Developers and Businesses
                </h3>
                <p className="mt-3 leading-7 text-[#625B55]">
                  We aim to publish educational information about
                  courier APIs, shipment tracking workflows, and
                  logistics integrations. Actual API access,
                  supported features, fees, and approval requirements
                  are determined by the relevant providers.
                </p>
              </div>
            </section>

            <section className="mt-12 rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] p-6">
              <h2 className="text-2xl font-bold">
                Independent Tracking Platform
              </h2>

              <p className="mt-4 leading-7 text-[#625B55]">
                TrackAllInOne is an independent website. Unless
                expressly stated otherwise, we are not owned by,
                operated by, or affiliated with the courier and
                postal companies mentioned on our website.
              </p>

              <p className="mt-4 leading-7 text-[#625B55]">
                Tracking information is dependent on the data
                returned by our tracking provider and the relevant
                courier systems. Updates may be delayed, incomplete,
                or unavailable. For official delivery confirmation
                or shipment disputes, contact the relevant courier.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="mt-4 leading-7 text-[#625B55]">
                If you have a question, notice an issue, or want to
                share feedback about TrackAllInOne, please visit
                our Contact page.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex font-semibold text-[#7A1717] hover:underline"
              >
                Contact TrackAllInOne →
              </Link>
            </section>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
