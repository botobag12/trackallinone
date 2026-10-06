import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Terms & Conditions | TrackAllInOne",
  description:
    "Read the Terms and Conditions for using TrackAllInOne and its courier tracking directory.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">

      {/* HEADER */}

        <Header />

      {/* HERO */}

      <section className="px-6 py-16 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[#625B55]">
            Please review the terms that apply when using
            TrackAllInOne.
          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section className="px-6 pb-20">

        <div className="mx-auto max-w-4xl">

          <article className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-12">

            <p className="text-sm text-[#625B55]">
              Last updated: October 2026
            </p>

            {/* ACCEPTANCE */}

            <section className="mt-8">

              <h2 className="text-2xl font-bold">
                1. Acceptance of Terms
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                By accessing or using TrackAllInOne, you agree
                to these Terms & Conditions. If you do not agree
                with these terms, please do not use the website.
              </p>

            </section>

            {/* SERVICE */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                2. Our Service
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne provides a directory and convenient
                access point for courier and postal tracking
                services.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                The website may provide links or tracking
                connections to official third-party courier
                websites.
              </p>

            </section>

            {/* THIRD PARTY */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                3. Third-Party Courier Services
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is an independent website and is
                not affiliated with, owned by, or operated by the
                courier and postal companies listed on the
                website unless explicitly stated otherwise.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Courier websites, tracking systems, services,
                policies, and availability are controlled by the
                respective courier companies.
              </p>

            </section>

            {/* TRACKING INFORMATION */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                4. Tracking Information
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Shipment status and delivery information are
                provided by the respective courier or postal
                service.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne does not guarantee that tracking
                information will always be available, accurate,
                complete, or up to date.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                For the most accurate shipment information, users
                should verify their shipment directly through the
                official courier tracking system.
              </p>

            </section>

            {/* USER RESPONSIBILITIES */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                5. User Responsibilities
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Users agree to use TrackAllInOne for lawful
                purposes and in a manner that does not interfere
                with the operation of the website.
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">

                <li>
                  Do not attempt to disrupt or damage the website.
                </li>

                <li>
                  Do not use the website for unlawful activities.
                </li>

                <li>
                  Do not attempt to gain unauthorized access to
                  website systems.
                </li>

                <li>
                  Do not misuse automated requests or tracking
                  services.
                </li>

              </ul>

            </section>

            {/* AVAILABILITY */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                6. Website Availability
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We aim to keep TrackAllInOne available and
                functional, but we cannot guarantee uninterrupted
                access to the website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                The website may occasionally be unavailable due
                to maintenance, technical problems, updates, or
                circumstances outside our control.
              </p>

            </section>

            {/* EXTERNAL LINKS */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                7. External Links
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne may contain links to external
                websites operated by third parties.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                We are not responsible for the content,
                availability, security, or policies of external
                websites. Users should review the terms and
                privacy policies of those websites.
              </p>

            </section>

            {/* INTELLECTUAL PROPERTY */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                8. Intellectual Property
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                The TrackAllInOne website, including its original
                design, text, branding, and other original
                materials, may be protected by applicable
                intellectual property laws.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Courier names, trademarks, logos, and other
                third-party materials belong to their respective
                owners.
              </p>

            </section>

            {/* DISCLAIMER */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                9. Disclaimer
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is provided on an "as available"
                basis. We make no guarantee that the information
                presented through the website will always be
                complete, accurate, or current.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Users should rely on the official courier or
                postal service for final shipment information.
              </p>

            </section>

            {/* LIMITATION */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                10. Limitation of Liability
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                To the extent permitted by applicable law,
                TrackAllInOne and its operators will not be
                responsible for losses or damages resulting from
                the use of the website, third-party courier
                services, tracking information, or external
                websites.
              </p>

            </section>

            {/* CHANGES */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                11. Changes to These Terms
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                These Terms & Conditions may be updated from time
                to time as TrackAllInOne develops or new features
                and services are introduced.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Updated terms will be published on this page with
                a revised update date.
              </p>

            </section>

            {/* CONTACT */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                12. Contact Us
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                If you have questions about these Terms &
                Conditions, please contact us through our Contact
                page.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-block font-semibold text-[#7A1717] hover:underline"
              >
                Contact TrackAllInOne →
              </Link>

            </section>

          </article>

        </div>

      </section>

      {/* FOOTER */}

        <Footer />


    </main>
  );
}