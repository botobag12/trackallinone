
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Privacy Policy | TrackAllInOne",
  description:
    "Learn how TrackAllInOne processes tracking requests, monitors website performance, uses operational analytics, and handles information.",
  alternates: {
    canonical: "https://www.trackallinone.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | TrackAllInOne",
    description:
      "Understand how TrackAllInOne handles shipment tracking, courier coverage, website analytics, and privacy.",
    url: "https://www.trackallinone.com/privacy",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      {/* HERO */}
      <section className="px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Legal & Privacy
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#625B55]">
            Learn how information may be processed when you use
            TrackAllInOne, submit shipment tracking requests, or
            interact with our website and its features.
          </p>
        </div>
      </section>

      {/* POLICY CONTENT */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <article className="rounded-2xl border border-[#E5DCD0] bg-white p-6 shadow-sm sm:p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#82766D]">
                Last updated: November 15, 2026
              </p>

              <span className="rounded-full bg-[#F8E9E2] px-3 py-1 text-xs font-bold text-[#7A1717]">
                TrackAllInOne
              </span>
            </div>

            {/* 1 */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold">
                1. Introduction
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne operates at{" "}
                <a
                  href="https://www.trackallinone.com"
                  className="font-medium text-[#7A1717] hover:underline"
                >
                  www.trackallinone.com
                </a>
                . We provide shipment tracking tools, courier
                information, and educational tracking guides.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                This Privacy Policy explains what information may
                be processed when you visit our website, submit
                tracking requests, use our features, or contact us.
                It also describes how we use operational analytics
                to monitor and improve website performance.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Please read this policy together with our Terms
                &amp; Conditions. The information processed may
                vary depending on the features you use and the
                third-party services involved.
              </p>
            </section>

            {/* 2 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                2. Courier Coverage and Tracking Availability
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne currently lists 23 courier and postal
                services in its courier directory. Our aim is to
                make it easier for visitors to discover courier
                information and check available shipment updates
                through our tracking platform.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                However, listing a courier on our website does not
                necessarily mean that live tracking is available
                for every shipment handled by that courier.
                Tracking support depends on the coverage provided
                by our tracking provider and the information made
                available by the relevant courier.
              </p>

              <div className="mt-5 rounded-xl border border-[#E9DED2] bg-[#FFF8ED] p-5">
                <h3 className="font-bold text-[#7A1717]">
                  Important Tracking Notice
                </h3>

                <p className="mt-2 leading-7 text-[#625B55]">
                  We cannot guarantee a successful result for
                  every tracking request. A request may return
                  no results, incomplete information, an error,
                  or an unavailable status.
                </p>
              </div>

              <p className="mt-4 leading-8 text-[#625B55]">
                Possible reasons include an incorrect or newly
                generated tracking number, unsupported courier
                coverage, delayed shipment registration, temporary
                provider issues, or unavailable data from the
                courier's systems.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                A courier appearing in our directory should not
                be interpreted as a guarantee that every parcel
                from that courier can be tracked successfully
                through our platform.
              </p>
            </section>

            {/* 3 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                3. Information We May Process
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Depending on how you interact with TrackAllInOne,
                different categories of information may be
                processed, including:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>
                  <strong>Tracking information:</strong> Tracking
                  numbers and courier information submitted when
                  requesting shipment details.
                </li>

                <li>
                  <strong>Technical information:</strong> Technical
                  details that may be recorded by hosting or
                  security services, such as IP addresses, browser
                  information, device details, request timestamps,
                  and diagnostic logs.
                </li>

                <li>
                  <strong>Operational analytics:</strong> Tracking
                  request activity, request identifiers, courier
                  information, processing outcomes, attempt counts,
                  and technical error information used to monitor
                  the performance of our tracking system.
                </li>

                <li>
                  <strong>Contact information:</strong> Information
                  you voluntarily provide when contacting us,
                  such as your email address and message content.
                </li>

                <li>
                  <strong>Website usage information:</strong>{" "}
                  Information that may be processed by analytics
                  or similar services, if enabled, to understand
                  website usage and performance.
                </li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                The information processed depends on the website
                configuration and services currently in use.
                We do not ask visitors to provide payment card
                details or account passwords through our tracking
                form.
              </p>
            </section>

            {/* 4 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                4. How Tracking Requests Are Processed
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                When you submit a tracking number through our
                website, TrackAllInOne sends the request to its
                configured tracking service. The tracking provider
                processes the request and attempts to retrieve
                available shipment information from supported
                courier systems.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Depending on availability, the returned information
                may include the shipment status, courier details,
                and tracking events.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Tracking numbers are processed as necessary to
                fulfil tracking requests. Our operational analytics
                records are designed to monitor request activity
                without intentionally storing the submitted
                tracking numbers in those analytics records.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                This does not mean that tracking numbers are never
                processed or temporarily handled. Our tracking
                provider and relevant courier systems may process
                the information to fulfil requests, and their own
                logging and retention practices may apply.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Please submit only the information necessary to
                identify your shipment. Do not enter passwords,
                payment information, or unrelated sensitive
                information in tracking fields.
              </p>
            </section>

            {/* 5 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                5. Website Analytics and Performance Monitoring
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We use operational analytics to understand how
                TrackAllInOne performs and to identify areas
                requiring technical improvements.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our internal tracking analytics system may record
                information such as:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>
                  The number of tracking requests submitted
                  through the website.
                </li>

                <li>
                  Whether tracking requests completed successfully
                  or encountered errors.
                </li>

                <li>
                  The courier or carrier associated with a request,
                  where available.
                </li>

                <li>
                  Tracking provider attempts and processing
                  outcomes.
                </li>

                <li>
                  Courier performance and the frequency of
                  unsuccessful tracking attempts.
                </li>

                <li>
                  Request timestamps and technical error
                  information used for troubleshooting.
                </li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                These analytics help us understand which courier
                services are working reliably, identify recurring
                errors, monitor tracking availability, and improve
                the overall tracking experience.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We use a Supabase-backed database for our
                operational tracking records and administrative
                monitoring features. Access to administrative
                analytics is restricted to authorized platform
                personnel.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our operational analytics are intended for
                website maintenance and performance monitoring.
                They should not be interpreted as a guarantee
                that every courier or tracking request will
                always be available or successful.
              </p>
            </section>

            {/* 6 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                6. How We Use Information
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Information may be processed for purposes such as:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>Processing tracking requests and displaying available results.</li>
                <li>Monitoring tracking provider and courier performance.</li>
                <li>Identifying unsuccessful requests and technical errors.</li>
                <li>Maintaining, troubleshooting, and securing the website.</li>
                <li>Improving website functionality and user experience.</li>
                <li>Responding to questions, feedback, and contact messages.</li>
                <li>Understanding website usage where analytics services are enabled.</li>
                <li>Supporting advertising where advertising services are enabled.</li>
              </ul>
            </section>

            {/* 7 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                7. Website Improvements and New Features
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is continuously being developed.
                We may introduce improvements to shipment tracking,
                courier coverage, automatic carrier detection,
                tracking result presentation, PDF tracking
                summaries, courier information, and educational
                resources.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We also use operational performance information
                to identify technical problems and evaluate how
                well our tracking integrations are working.
                These improvements are intended to make the
                website more useful, reliable, and easier to use.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                New features may involve additional information
                processing. If a significant change affects the
                way information is handled, we will update this
                Privacy Policy as appropriate.
              </p>
            </section>

            {/* 8 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                8. Third-Party Services and Providers
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne relies on external services to
                provide and maintain parts of its functionality.
                These may include:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>
                  <strong>Tracking providers:</strong> Process
                  tracking requests and retrieve available
                  shipment information.
                </li>

                <li>
                  <strong>Hosting and deployment services:</strong>{" "}
                  Host the website and may process technical
                  information necessary for website operation.
                </li>

                <li>
                  <strong>Database services:</strong> Store
                  operational records and information required
                  for configured website features.
                </li>

                <li>
                  <strong>Security and performance services:</strong>{" "}
                  Help maintain website availability, security,
                  and performance where enabled.
                </li>

                <li>
                  <strong>Analytics and advertising services:</strong>{" "}
                  May process website usage information if those
                  services are configured.
                </li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                Third-party providers may process information
                under their own privacy policies, terms, and
                service agreements. Their data handling practices,
                retention periods, and processing locations may
                differ from ours.
              </p>
            </section>

            {/* 9 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                9. Cookies, Analytics, and Advertising
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Cookies and similar technologies may be used
                by TrackAllInOne or third-party services to
                support website functionality, security,
                analytics, and advertising where applicable.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Operational tracking analytics are separate
                from browser cookie-based analytics. The use
                of additional analytics or advertising tools
                depends on the website's actual configuration.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                You can manage cookies through your browser
                settings where those controls are available.
                If additional analytics or advertising services
                are introduced, we will update this policy
                where necessary.
              </p>
            </section>

            {/* 10 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                10. Data Retention and Security
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Information should be retained only for as long
                as reasonably necessary for the purpose for which
                it was processed, including tracking operations,
                technical monitoring, responding to enquiries,
                maintaining security, and meeting applicable
                legal obligations.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Actual retention periods may depend on the
                configuration and policies of our hosting,
                database, tracking, and other third-party
                providers.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We aim to use reasonable technical and
                organisational safeguards to protect information
                and restrict access to authorized personnel.
                However, no website, database, or internet
                transmission can be guaranteed completely secure.
              </p>
            </section>

            {/* 11 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                11. External Websites and Courier Services
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our website may contain links to courier websites,
                postal services, and other external resources.
                When you visit an external website, its own
                privacy policy and terms apply to your activity.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne does not control the privacy
                practices or information handling procedures
                of external websites and courier companies.
              </p>
            </section>

            {/* 12 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                12. Your Choices and Privacy Requests
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                You can choose not to submit a tracking number
                or contact message. You may also manage cookies
                through your browser settings where available.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                If you have a question or request concerning
                information you have provided to us, please
                contact us. We will review your request and
                respond as appropriate under applicable law.
                Some information may need to be retained for
                security, operational, or legal reasons.
              </p>
            </section>

            {/* 13 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                13. Children's Privacy
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is a general-purpose website and
                is not specifically directed toward children.
                We do not knowingly seek to collect personal
                information from children unnecessarily.
                If you believe a child has provided personal
                information to us, please contact us so we
                can review the situation.
              </p>
            </section>

            {/* 14 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                14. Changes to This Privacy Policy
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may update this Privacy Policy when our
                website, tracking integrations, analytics
                systems, or information-handling practices
                change.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Updated versions will be published on this
                page with a revised date. We encourage visitors
                to review this page periodically.
              </p>
            </section>

            {/* 15 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                15. Contact Us
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                For privacy questions, information requests,
                or other enquiries about this policy, please
                contact the TrackAllInOne owner through our
                Contact page.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex font-semibold text-[#7A1717] hover:underline"
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
