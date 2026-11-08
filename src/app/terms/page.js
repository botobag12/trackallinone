
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Terms & Conditions | TrackAllInOne",
  description:
    "Read the terms for using TrackAllInOne, including shipment tracking, third-party data, PDF reports, service limitations, and user responsibilities.",
  alternates: {
    canonical: "https://www.trackallinone.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | TrackAllInOne",
    description:
      "Understand the terms and limitations that apply when using TrackAllInOne's shipment tracking tools and website.",
    url: "https://www.trackallinone.com/terms",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Terms &amp; Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#625B55]">
            These terms explain the conditions and limitations
            that apply when you use TrackAllInOne.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <article className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">
            <p className="text-sm text-[#625B55]">
              Last updated: October 18, 2026
            </p>

            <section className="mt-8">
              <h2 className="text-2xl font-bold">
                1. Acceptance of Terms
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                By accessing or using TrackAllInOne at
                https://www.trackallinone.com, you agree to these
                Terms &amp; Conditions and our Privacy Policy. If
                you do not agree, please discontinue use of the
                website.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                2. About Our Service
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne provides shipment tracking
                functionality for supported shipments, courier
                information, and educational tracking resources.
                When you submit a tracking request, the website
                processes it through its tracking integration or
                provider to retrieve the information available
                for that request.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Tracking coverage varies. Listing a courier on
                our website does not guarantee that the courier
                is supported by the live tracking tool or that
                every tracking number will return results.
                Features may change as the website develops.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                3. Independent Website and Third-Party Services
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is an independent website and is
                not owned by, operated by, or affiliated with
                courier or postal companies unless expressly
                stated otherwise.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Our tracking functionality depends on third-party
                systems and data providers. These services may
                experience outages, impose usage limits, change
                their coverage, or return incomplete or delayed
                information. Their own terms and policies may
                apply to their services.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                4. Tracking Information and Delivery Status
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Shipment status, scan events, estimated delivery
                information, and other tracking details are shown
                only to the extent that information is available
                from the tracking provider or its sources.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne does not guarantee that tracking
                results will be accurate, complete, current, or
                uninterrupted. A status may not update immediately,
                and a missing result does not necessarily mean
                that a parcel has been lost or was never shipped.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Do not rely solely on TrackAllInOne for time-critical
                decisions, delivery disputes, claims, or official
                proof of delivery. Contact the relevant courier
                or seller when official confirmation is needed.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                5. Tracking Numbers and User Responsibilities
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                You are responsible for entering a tracking number
                correctly and using the website lawfully. Submit
                only tracking information that you are authorized
                to use.
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>Do not use the website for unlawful purposes.</li>
                <li>
                  Do not attempt to disrupt, overload, or damage
                  the website or its tracking integrations.
                </li>
                <li>
                  Do not attempt to access restricted systems,
                  credentials, or data without authorization.
                </li>
                <li>
                  Do not misuse automated requests or attempt to
                  bypass service limits or security measures.
                </li>
                <li>
                  Do not enter passwords, payment-card details,
                  or unrelated sensitive information into tracking
                  fields.
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                6. PDF Tracking Reports
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                If available, the PDF download feature creates a
                summary of the tracking information displayed by
                TrackAllInOne at the time the report is generated.
                Its contents may be limited by the data returned
                for the shipment.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                A PDF generated by TrackAllInOne is not an official
                courier receipt, proof of payment, shipping label,
                booking confirmation, or official proof of delivery.
                Do not present it as an official courier document.
                Contact the relevant courier for documents issued
                by that company.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                7. Website Availability and Changes
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                We aim to maintain a useful and reliable website,
                but we do not guarantee continuous availability.
                Access or features may be interrupted by maintenance,
                technical problems, provider outages, security
                measures, or circumstances beyond our control.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                We may update, suspend, or discontinue website
                features when reasonably necessary.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                8. External Websites and Trademarks
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Our website may refer to third-party companies or
                services and may provide external links in relevant
                areas. We do not control third-party websites and
                are not responsible for their content, availability,
                security, or privacy practices.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Courier names, logos, and trademarks belong to their
                respective owners. Their appearance on TrackAllInOne
                is for identification and informational purposes
                and does not, by itself, imply endorsement or
                partnership.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                9. Intellectual Property
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Original TrackAllInOne website content, branding,
                and design elements may be protected by applicable
                intellectual property laws. You may use the website
                for personal and lawful purposes but may not copy,
                republish, or commercially exploit protected
                materials without permission where permission is
                required by law.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                This section does not claim ownership of third-party
                trademarks, logos, or content.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                10. Disclaimer and Limitation of Liability
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                To the extent permitted by applicable law,
                TrackAllInOne is provided on an “as available” and
                “as is” basis, without guarantees that the website
                or tracking information will meet every user's
                requirements.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                To the extent permitted by applicable law, the
                website's operators are not liable for indirect
                or consequential losses arising from the use of
                the website, unavailable or inaccurate tracking
                information, provider interruptions, or third-party
                services. Nothing in these terms excludes or limits
                liability that cannot lawfully be excluded or
                limited.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                11. Privacy
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Your use of TrackAllInOne is also subject to our
                Privacy Policy, which explains how information
                may be handled when you use the website and
                submit tracking requests.
              </p>
              <Link
                href="/privacy"
                className="mt-4 inline-flex font-semibold text-[#7A1717] hover:underline"
              >
                Read Our Privacy Policy →
              </Link>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                12. Changes to These Terms
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                We may revise these Terms &amp; Conditions as the
                website, tracking integrations, or applicable
                requirements change. The latest version and its
                update date will be published on this page. Your
                continued use after an update means you use the
                website subject to the revised terms, to the
                extent permitted by applicable law.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">13. Contact Us</h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                If you have questions about these Terms &amp;
                Conditions, please contact us through our Contact
                page.
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
