
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Privacy Policy | TrackAllInOne",
  description:
    "Learn how TrackAllInOne handles tracking numbers, technical information, contact messages, third-party tracking services, and privacy.",
  alternates: {
    canonical: "https://www.trackallinone.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | TrackAllInOne",
    description:
      "Understand how information may be processed when you use TrackAllInOne's shipment tracking tools and website.",
    url: "https://www.trackallinone.com/privacy",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">
      <Header />

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#625B55]">
            Learn how information may be handled when you visit
            TrackAllInOne or submit a shipment tracking request.
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
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne operates at
                {" "}
                <a
                  href="https://www.trackallinone.com"
                  className="font-medium text-[#7A1717] hover:underline"
                >
                  www.trackallinone.com
                </a>
                . This Privacy Policy explains how information may
                be processed when you visit our website, submit
                tracking requests, use available features, or
                contact us.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Please read this policy together with our Terms
                &amp; Conditions. The specific information processed
                may depend on the features you use and the
                third-party services enabled on the website.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                2. Information We May Process
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Depending on your interaction with the website,
                information may include:
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>
                  <strong>Tracking information:</strong> the
                  tracking number and courier selection you submit
                  when requesting shipment information.
                </li>
                <li>
                  <strong>Technical information:</strong> information
                  that may be recorded by our hosting or security
                  services, such as IP address, browser details,
                  device information, request time, and diagnostic
                  logs.
                </li>
                <li>
                  <strong>Messages you send us:</strong> information
                  you choose to provide when contacting us, such
                  as your email address and the contents of your
                  message.
                </li>
                <li>
                  <strong>Usage information:</strong> if analytics
                  tools are enabled, information about how visitors
                  use the website may be processed by those tools.
                </li>
              </ul>
              <p className="mt-4 leading-8 text-[#625B55]">
                The exact information collected depends on the
                website configuration and the services in use.
                We do not ask users to submit payment details or
                account passwords through the tracking form.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                3. How Tracking Requests Work
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                When you submit a tracking number through the
                TrackAllInOne tracking tool, the website sends
                the tracking request to our tracking provider so
                that it can retrieve available shipment information.
                The provider may process the tracking number and
                courier details to fulfil the request.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                The returned information may include a shipment
                status and tracking events. Results depend on
                provider coverage and the data available from
                the relevant courier systems.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                We do not intentionally request unrelated sensitive
                information for parcel tracking. Please submit only
                the information needed to identify your shipment
                and avoid entering passwords, payment information,
                or other sensitive details in tracking fields.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                4. How We May Use Information
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Information may be used, where applicable, to:
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">
                <li>Process tracking requests and display results.</li>
                <li>
                  Maintain, troubleshoot, and protect the website.
                </li>
                <li>
                  Respond to messages and questions sent to us.
                </li>
                <li>
                  Diagnose technical errors and prevent abuse.
                </li>
                <li>
                  Understand website performance if analytics
                  services are enabled.
                </li>
                <li>
                  Support advertising if advertising services are
                  enabled on the website.
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                5. Third-Party Providers
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne relies on a third-party tracking
                provider to process supported tracking requests.
                Hosting, security, analytics, or advertising
                providers may also process information if those
                services are configured on the website.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                These providers may handle information under their
                own terms, privacy policies, and service agreements.
                Their data handling practices, retention periods,
                and processing locations may differ from ours.
                Review the relevant provider's privacy information
                when you need details about its practices.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                6. Cookies, Analytics, and Advertising
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Cookies and similar technologies may be used by
                the website or by third-party services to support
                functionality, security, analytics, or advertising,
                where those services are enabled.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                The use of these technologies depends on the
                website's current configuration. If analytics
                or advertising tools are introduced or changed,
                this policy should be updated to reflect the
                actual services and applicable consent requirements.
                You can also review the cookie and privacy controls
                provided by your browser.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                7. Data Retention and Security
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                Information should be retained only for as long
                as reasonably necessary for the purpose for which
                it was processed, including responding to enquiries,
                maintaining security, troubleshooting, and meeting
                applicable legal obligations.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                Actual retention periods may depend on our hosting
                provider, tracking provider, and other configured
                services. We aim to use reasonable safeguards to
                protect information, but no website, system, or
                internet transmission can be guaranteed completely
                secure.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                8. External Websites
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne may reference or link to websites
                operated by other organisations. Once you visit
                an external website, its privacy policy and terms
                apply to your interactions there. We do not control
                the privacy practices of those websites.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                9. Your Choices and Privacy Requests
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                You can choose not to submit a tracking number
                or contact message. You can also use your browser
                settings to manage cookies where available.
              </p>
              <p className="mt-4 leading-8 text-[#625B55]">
                If you have a question or a request concerning
                information you have provided to us, please contact
                us. We will review the request and respond as
                appropriate under applicable law. Some information
                may be retained when required for security,
                operational, or legal reasons.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                10. Children's Privacy
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is a general-purpose website and is
                not specifically directed toward children. We do
                not knowingly seek to collect personal information
                from children unnecessarily. If you believe a child
                has provided personal information to us, please
                contact us so we can review the situation.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                11. Changes to This Policy
              </h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                We may update this Privacy Policy when our website,
                tracking integrations, or data practices change.
                The revised version will be published on this page
                with an updated date. Please review this page
                periodically.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">12. Contact Us</h2>
              <p className="mt-4 leading-8 text-[#625B55]">
                For privacy questions or requests, please use
                our Contact page.
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
