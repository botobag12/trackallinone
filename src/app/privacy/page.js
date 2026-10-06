import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Privacy Policy | TrackAllInOne",
  description:
    "Read the TrackAllInOne privacy policy and learn how information is handled when you use our website.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[#625B55]">
            Learn how TrackAllInOne handles information when you
            use our website and courier tracking services.
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

            {/* INTRODUCTION */}

            <section className="mt-8">

              <h2 className="text-2xl font-bold">
                1. Introduction
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Welcome to TrackAllInOne. We respect your privacy
                and aim to be transparent about how information may
                be handled when you use our website.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                This Privacy Policy explains the general types of
                information that may be collected, how that
                information may be used, and the choices available
                to users.
              </p>

            </section>

            {/* INFORMATION */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                2. Information We May Collect
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                Depending on how you use TrackAllInOne, certain
                information may be collected automatically or
                provided voluntarily.
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-[#625B55]">

                <li>
                  Basic technical information such as browser type,
                  device type, operating system, and approximate
                  usage information.
                </li>

                <li>
                  Information provided voluntarily when contacting
                  us, such as your name and email address.
                </li>

                <li>
                  Website usage information that may help us
                  understand how visitors use TrackAllInOne.
                </li>

              </ul>

            </section>

            {/* TRACKING NUMBERS */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                3. Tracking Numbers
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is designed to help users access
                official courier tracking services. Tracking
                information entered on TrackAllInOne may be used
                to direct users to the appropriate courier's
                tracking service.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Users should avoid entering passwords, payment
                information, or other sensitive personal
                information into tracking fields.
              </p>

            </section>

            {/* COOKIES */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                4. Cookies and Similar Technologies
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne may use cookies or similar
                technologies in the future to improve website
                functionality, understand website usage, or
                support services such as analytics and
                advertising.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                If such technologies are introduced, this Privacy
                Policy may be updated to explain their use.
              </p>

            </section>

            {/* THIRD PARTY SERVICES */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                5. Third-Party Services
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne may link to or interact with
                third-party services, including courier and postal
                websites.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                When you leave TrackAllInOne and visit a
                third-party website, that website's own privacy
                policy and terms may apply. We recommend reviewing
                the policies of those services before providing
                personal information.
              </p>

            </section>

            {/* DATA SECURITY */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                6. Data Security
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We aim to use reasonable measures to protect
                information handled through TrackAllInOne.
                However, no website or online transmission can be
                guaranteed to be completely secure.
              </p>

            </section>

            {/* CHILDREN */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                7. Children's Privacy
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                TrackAllInOne is a general-purpose website and is
                not specifically directed toward children. We do
                not knowingly seek to collect unnecessary personal
                information from children.
              </p>

            </section>

            {/* CHANGES */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                8. Changes to This Privacy Policy
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                We may update this Privacy Policy from time to time
                as TrackAllInOne develops or as new services and
                technologies are introduced.
              </p>

              <p className="mt-4 leading-8 text-[#625B55]">
                Any updated version will be published on this page
                with a revised update date.
              </p>

            </section>

            {/* CONTACT */}

            <section className="mt-10">

              <h2 className="text-2xl font-bold">
                9. Contact Us
              </h2>

              <p className="mt-4 leading-8 text-[#625B55]">
                If you have questions about this Privacy Policy,
                please visit our Contact page.
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