
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Terms & Conditions | TrackAllInOne",
  description:
    "Read TrackAllInOne's terms for courier tracking, service limitations, third-party providers, analytics, PDF reports, and user responsibilities.",
  alternates: {
    canonical: "https://www.trackallinone.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | TrackAllInOne",
    description:
      "Understand the terms, tracking limitations, and responsibilities associated with using TrackAllInOne.",
    url: "https://www.trackallinone.com/terms",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      {/* HERO */}
      <section className="px-4 py-16 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Legal &amp; Guidelines
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Terms &amp; Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#625B55]">
            Please review these terms before using TrackAllInOne.
            They explain our services, tracking limitations,
            third-party integrations, and your responsibilities.
          </p>
        </div>
      </section>

      {/* TERMS CONTENT */}
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
                1. Acceptance of Terms
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                By accessing or using TrackAllInOne at{" "}
                <a
                  href="https://www.trackallinone.com"
                  className="font-medium text-[#7A1717] hover:underline"
                >
                  www.trackallinone.com
                </a>
                , you agree to these Terms &amp; Conditions and
                our Privacy Policy. If you do not agree with
                these terms, please discontinue using the website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                These terms apply to visitors and users of our
                website, including those who use shipment tracking
                tools, courier information, and educational
                resources.
              </p>
            </section>

            {/* 2 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                2. About TrackAllInOne
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is an independent shipment tracking
                platform that provides tracking functionality,
                courier information, and educational resources
                to help users understand the parcel delivery
                process.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our website currently lists 23 courier and postal
                services. Users can explore courier information
                and submit tracking requests through our tracking
                tool, subject to available provider coverage.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our services may include automatic carrier
                detection, manual carrier selection where
                available, shipment status information, tracking
                events, PDF tracking summaries, courier guides,
                and other website features.
              </p>
            </section>

            {/* 3 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                3. Courier Coverage and Tracking Limitations
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Although TrackAllInOne lists multiple courier
                and postal services, the presence of a courier
                in our directory does not guarantee that every
                shipment handled by that courier can be tracked
                successfully through our platform.
              </p>

              <div className="mt-5 rounded-xl border border-[#E9DED2] bg-[#FFF8ED] p-5">
                <h3 className="font-bold text-[#7A1717]">
                  No Guaranteed Tracking Results
                </h3>

                <p className="mt-2 leading-7 text-[#625B55]">
                  We do not guarantee successful tracking results
                  for every tracking number, courier, or shipment.
                  Tracking availability depends on provider
                  coverage and the information supplied by
                  external courier systems.
                </p>
              </div>

              <p className="mt-4 leading-8 text-[#625B55]">
                A tracking request may fail or return incomplete
                information for reasons including:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>An incorrect or incomplete tracking number.</li>
                <li>A newly generated tracking number not yet registered in the courier system.</li>
                <li>A courier or shipment type not supported by the tracking provider.</li>
                <li>Temporary courier or tracking provider outages.</li>
                <li>Delayed, incomplete, or unavailable shipment data.</li>
                <li>Technical errors or temporary service limitations.</li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                Automatic carrier detection may also identify
                an incorrect carrier or fail to identify a
                shipment. Where manual carrier selection is
                available, users may use it to submit another
                tracking request.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may add, remove, or change courier listings
                and tracking integrations as our platform
                develops.
              </p>
            </section>

            {/* 4 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                4. Independent Platform and Third-Party Services
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is an independent website. Unless
                expressly stated otherwise, we are not owned
                by, operated by, sponsored by, or affiliated
                with the courier and postal companies mentioned
                on our website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our tracking functionality depends on external
                tracking providers and courier systems. These
                providers may change their services, impose
                usage limits, restrict access, modify coverage,
                or experience interruptions.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We do not control external courier databases
                or guarantee the availability, accuracy, or
                continuity of third-party services.
              </p>
            </section>

            {/* 5 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                5. Tracking Information and Delivery Status
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Shipment statuses, tracking events, estimated
                delivery information, and other shipment details
                are displayed based on information returned
                by our tracking provider and its available
                sources.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We do not independently verify every shipment
                update. Information may be delayed, incomplete,
                outdated, or inaccurate.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                A missing tracking result does not necessarily
                mean that a parcel has been lost, cancelled,
                or never shipped. Similarly, a displayed
                delivery status should not be treated as
                official confirmation without verification
                from the relevant courier.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Do not rely solely on TrackAllInOne for
                time-critical decisions, shipment disputes,
                insurance claims, or official proof of delivery.
                Contact the courier or seller when official
                confirmation is required.
              </p>
            </section>

            {/* 6 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                6. Tracking Numbers and User Responsibilities
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                You are responsible for entering correct
                tracking information and ensuring that you
                are authorized to use the tracking number
                submitted through our website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                When using TrackAllInOne, you agree not to:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>Use the website for unlawful purposes.</li>
                <li>Disrupt, overload, or damage the website or its tracking integrations.</li>
                <li>Attempt unauthorized access to restricted systems, accounts, or data.</li>
                <li>Abuse automated requests or attempt to bypass reasonable service limits or security measures.</li>
                <li>Submit passwords, payment-card details, or unrelated sensitive information through tracking fields.</li>
                <li>Copy, misuse, or exploit website content in violation of applicable laws or third-party rights.</li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may restrict access or take reasonable
                measures when necessary to protect the website,
                its users, and its infrastructure.
              </p>
            </section>

            {/* 7 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                7. Tracking Reports and PDF Downloads
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Where available, TrackAllInOne allows users
                to generate and download PDF summaries of
                tracking information displayed on the website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                The contents of a report depend on the shipment
                information available when the report is
                generated. It may include the tracking number,
                shipment status, courier details, and available
                tracking events.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                A PDF generated by TrackAllInOne is an
                informational summary only. It is not an
                official courier receipt, proof of payment,
                shipping label, booking confirmation, or
                official proof of delivery.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Users should contact the relevant courier
                for official shipment documents and
                confirmations.
              </p>
            </section>

            {/* 8 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                8. Website Analytics and Performance Monitoring
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We use internal operational analytics to
                understand how our tracking system performs
                and to identify areas that require improvement.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                These records may include:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>The number of tracking requests submitted.</li>
                <li>Successful and unsuccessful tracking outcomes.</li>
                <li>Courier and carrier performance information.</li>
                <li>Tracking provider attempts and processing results.</li>
                <li>Technical errors, request identifiers, and timestamps.</li>
              </ul>

              <p className="mt-4 leading-8 text-[#625B55]">
                We use these records to monitor service
                availability, identify recurring failures,
                understand courier performance, troubleshoot
                technical problems, and improve the user
                experience.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Our operational analytics system uses a
                Supabase-backed database for configured
                administrative and monitoring features.
                Access to administrative information is
                restricted to authorized personnel.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Operational analytics are intended to monitor
                platform performance. They do not constitute
                an independent verification of courier
                performance or a guarantee of future tracking
                availability.
              </p>
            </section>

            {/* 9 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                9. Website Improvements and New Features
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is continuously being improved.
                We may update our tracking tools, automatic
                carrier detection, courier integrations,
                tracking result presentation, PDF reports,
                courier directory, educational guides, and
                administrative monitoring features.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may also introduce new features or modify
                existing functionality to improve performance,
                usability, reliability, and service coverage.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We reserve the right to update, suspend,
                replace, or discontinue features when
                reasonably necessary.
              </p>
            </section>

            {/* 10 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                10. Website Availability and Maintenance
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We aim to maintain a useful and reliable
                website, but we do not guarantee uninterrupted
                availability or error-free operation.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Access may be interrupted by scheduled
                maintenance, technical problems, hosting
                issues, provider outages, security measures,
                network failures, or circumstances beyond
                our reasonable control.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may temporarily restrict access to
                certain features to maintain or protect
                the platform.
              </p>
            </section>

            {/* 11 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                11. External Websites and Trademarks
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne may contain links to courier
                websites, postal services, and other external
                resources. We do not control external websites
                and are not responsible for their content,
                availability, security, or privacy practices.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Courier names, logos, and trademarks belong
                to their respective owners. Their appearance
                on TrackAllInOne is for identification and
                informational purposes and does not, by itself,
                imply endorsement, sponsorship, or partnership.
              </p>
            </section>

            {/* 12 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                12. Intellectual Property
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Original TrackAllInOne branding, website design,
                and content may be protected by applicable
                intellectual property laws.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                You may access and use the website for lawful
                personal purposes. You may not reproduce,
                republish, distribute, or commercially exploit
                protected materials without permission where
                permission is required by law.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                This section does not claim ownership of
                third-party trademarks, logos, or content.
              </p>
            </section>

            {/* 13 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                13. Disclaimer and Limitation of Liability
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                To the extent permitted by applicable law,
                TrackAllInOne is provided on an "as is" and
                "as available" basis. We do not guarantee
                that the website, tracking results, or
                third-party integrations will meet every
                user's requirements.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                To the extent permitted by applicable law,
                TrackAllInOne and its operators are not
                responsible for indirect or consequential
                losses arising from the use of the website,
                unavailable or inaccurate tracking information,
                courier delays, provider interruptions, or
                third-party services.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Nothing in these terms excludes or limits
                liability that cannot lawfully be excluded
                or limited under applicable law.
              </p>
            </section>

            {/* 14 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                14. Privacy and Information Handling
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Your use of TrackAllInOne is also subject
                to our Privacy Policy, which explains how
                information may be processed through tracking
                requests, operational analytics, website
                services, and third-party integrations.
              </p>

              <Link
                href="/privacy"
                className="mt-4 inline-flex font-semibold text-[#7A1717] hover:underline"
              >
                Read Our Privacy Policy →
              </Link>
            </section>

            {/* 15 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                15. Changes to These Terms
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may revise these Terms &amp; Conditions
                when our website, tracking integrations,
                features, or applicable requirements change.
                The latest version and its update date will
                be published on this page.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We encourage users to review these terms
                periodically. Continued use of the website
                after revisions means use subject to the
                updated terms, to the extent permitted
                by applicable law.
              </p>
            </section>

            {/* 16 */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                16. Contact Us
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                If you have questions, feedback, or concerns
                about these Terms &amp; Conditions, please
                contact TrackAllInOne through our Contact page.
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
