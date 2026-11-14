
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "About TrackAllInOne | Parcel Tracking Made Easier",
  description:
    "Discover how TrackAllInOne simplifies shipment tracking with courier information, tracking tools, and practical delivery guides.",
  alternates: {
    canonical: "https://www.trackallinone.com/about",
  },
  openGraph: {
    title: "About TrackAllInOne | Parcel Tracking Made Easier",
    description:
      "Discover our shipment tracking tools, courier directory, and practical delivery guides.",
    url: "https://www.trackallinone.com/about",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

const features = [
  {
    number: "01",
    icon: "📦",
    title: "Shipment Tracking",
    description:
      "Submit a tracking number and check available shipment updates through our tracking service.",
    color: "bg-[#FFF0E5]",
  },
  {
    number: "02",
    icon: "🚚",
    title: "Courier Information",
    description:
      "Explore courier information, supported services, and useful details about delivery companies.",
    color: "bg-[#EAF2FF]",
  },
  {
    number: "03",
    icon: "📖",
    title: "Practical Guides",
    description:
      "Understand tracking statuses, find tracking numbers, and learn how to handle common tracking issues.",
    color: "bg-[#EAF5EB]",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter Your Tracking Number",
    description:
      "Visit our homepage and enter the tracking number provided by your seller or courier.",
  },
  {
    number: "02",
    title: "Submit Your Request",
    description:
      "Our tracking system processes your request through its tracking provider and available carrier coverage.",
  },
  {
    number: "03",
    title: "Review Shipment Updates",
    description:
      "View the shipment status and available tracking events returned for your parcel.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8ED] text-[#211D1A]">
      <Header />

      {/* HERO */}
      <section className="relative px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D6C7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7A1717]">
              <span className="h-2 w-2 rounded-full bg-[#7A1717]" />
              About Our Platform
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Making parcel tracking
              <span className="text-[#7A1717]"> simpler.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#71665E] sm:text-lg">
              TrackAllInOne brings shipment tracking tools, courier
              information, and practical delivery guides together
              to make it easier to follow your parcels.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A1717] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7A1717]/15 transition hover:-translate-y-0.5 hover:bg-[#5F1010]"
              >
                Track a Shipment
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/guides"
                className="inline-flex items-center justify-center rounded-xl border border-[#DCC8B8] bg-white px-6 py-3.5 text-sm font-bold text-[#7A1717] transition hover:border-[#7A1717]"
              >
                Explore Guides
              </Link>
            </div>
          </div>

          {/* VISUAL */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#F2DDD0] blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#E8E2D4] blur-3xl" />

            <div className="relative rounded-[32px] border border-[#E9DED2] bg-white p-5 shadow-[0_25px_70px_rgba(62,35,22,0.10)] sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A8B80]">
                    TrackAllInOne
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold">
                    Your parcel journey
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8E9E2] text-2xl">
                  📦
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#FFF8ED] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl">
                    🔍
                  </div>
                  <div>
                    <p className="text-sm font-bold">Shipment tracking</p>
                    <p className="mt-1 text-xs text-[#82766D]">
                      Check available delivery updates
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-12 rounded-xl border border-[#E8DED3] bg-white px-4 flex items-center text-sm text-[#A09388]">
                  Enter tracking number...
                </div>

                <div className="mt-3 rounded-xl bg-[#7A1717] py-3 text-center text-sm font-bold text-white">
                  Track Shipment →
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF5EB] text-lg">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-bold">Tracking tools</p>
                    <p className="mt-1 text-xs text-[#82766D]">
                      Available shipment information
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-lg">
                    🚚
                  </div>
                  <div>
                    <p className="text-sm font-bold">Courier information</p>
                    <p className="mt-1 text-xs text-[#82766D]">
                      Explore delivery services
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2ECFF] text-lg">
                    📖
                  </div>
                  <div>
                    <p className="text-sm font-bold">Helpful guides</p>
                    <p className="mt-1 text-xs text-[#82766D]">
                      Understand shipment updates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="border-y border-[#E9DED2] bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
              Who We Are
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              One platform for shipment tracking and courier information.
            </h2>

            <p className="mt-6 leading-8 text-[#71665E]">
              TrackAllInOne is an independent shipment tracking
              website designed to help people find available parcel
              updates and understand the delivery process.
            </p>

            <p className="mt-4 leading-8 text-[#71665E]">
              Instead of visiting multiple websites just to explore
              courier information or understand tracking terminology,
              visitors can use our tracking tools and educational
              resources in one place.
            </p>

            <p className="mt-4 leading-8 text-[#71665E]">
              Our platform is intended for online shoppers,
              individuals, sellers, and businesses that regularly
              send or receive shipments.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-2xl border border-[#E9DED2] bg-[#FFFCF8] p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${feature.color}`}
                  >
                    {feature.icon}
                  </div>

                  <span className="text-sm font-extrabold text-[#B6A79B]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#71665E]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR GOAL */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
              Our Purpose
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Making delivery information easier to understand.
            </h2>
          </div>

          <div className="rounded-3xl border border-[#E9DED2] bg-white p-6 shadow-sm sm:p-9">
            <p className="leading-8 text-[#71665E]">
              Our goal is to make parcel tracking more convenient
              and accessible. We want visitors to have a clearer
              understanding of shipment progress, common delivery
              statuses, and the information provided by tracking
              systems.
            </p>

            <p className="mt-4 leading-8 text-[#71665E]">
              We continue to improve the website and its educational
              resources. Tracking coverage and the amount of
              information available can vary depending on the
              courier and external tracking systems.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-[#E9DED2] bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How TrackAllInOne Works
            </h2>

            <p className="mt-4 leading-7 text-[#71665E]">
              A straightforward way to check available shipment
              information.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-2xl border border-[#E9DED2] bg-[#FFF8ED] p-6 sm:p-7"
              >
                <span className="text-4xl font-black text-[#E8CFC1]">
                  {step.number}
                </span>

                <h3 className="mt-5 text-lg font-extrabold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#71665E]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#7A1717] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#5F1010]"
            >
              Start Tracking →
            </Link>
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-[#E9DED2] bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E5] text-2xl">
              📄
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              Tracking Reports and PDF Downloads
            </h2>

            <p className="mt-4 leading-8 text-[#71665E]">
              Where available, users can download a PDF summary
              of the tracking information displayed by TrackAllInOne.
              The report may include the tracking number, available
              shipment status, and tracking events.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#82766D]">
              These reports are generated for personal reference.
              They are not official courier documents, proof of
              payment, shipping receipts, or independent confirmation
              of delivery.
            </p>
          </article>

          <article className="rounded-3xl border border-[#E9DED2] bg-white p-7 sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF] text-2xl">
              📚
            </div>

            <h2 className="mt-6 text-2xl font-extrabold">
              Tracking Guides and Courier Information
            </h2>

            <p className="mt-4 leading-8 text-[#71665E]">
              Tracking updates are not always easy to understand.
              Our guides aim to explain common shipment statuses,
              where to find tracking numbers, and what to do when
              tracking information is delayed or unavailable.
            </p>

            <Link
              href="/guides"
              className="mt-6 inline-flex items-center gap-2 font-bold text-[#7A1717] hover:underline"
            >
              Explore Tracking Guides →
            </Link>
          </article>
        </div>
      </section>

      {/* INDEPENDENCE */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#211D1A] p-7 text-white sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E6B9A3]">
              Transparency Matters
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              An independent shipment tracking platform.
            </h2>

            <p className="mt-6 leading-8 text-[#D7CCC3]">
              TrackAllInOne is an independent website. Unless
              expressly stated otherwise, we are not owned by,
              operated by, or affiliated with the courier and
              postal companies mentioned on our platform.
            </p>

            <p className="mt-4 leading-8 text-[#D7CCC3]">
              Shipment information depends on data returned by
              our tracking provider and the relevant courier
              systems. Updates may be delayed, incomplete, or
              unavailable. For official delivery confirmation,
              documentation, or shipment disputes, users should
              contact the relevant courier directly.
            </p>

            <Link
              href="/couriers"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#FFF8ED] px-6 py-3.5 text-sm font-bold text-[#7A1717] transition hover:bg-white"
            >
              Explore Courier Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#E9DED2] bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
            Get in Touch
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have a question or suggestion?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#71665E]">
            We welcome feedback, questions, and suggestions that
            can help us improve TrackAllInOne.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7A1717] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#5F1010]"
          >
            Contact Us →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
