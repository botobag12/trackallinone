
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Contact TrackAllInOne | Get in Touch",
  description:
    "Contact Rahat Hussain at TrackAllInOne for questions, feedback, courier information, and website inquiries.",
  alternates: {
    canonical: "https://www.trackallinone.com/contact",
  },
  openGraph: {
    title: "Contact TrackAllInOne",
    description:
      "Get in touch with TrackAllInOne for questions, feedback, and general inquiries.",
    url: "https://www.trackallinone.com/contact",
    siteName: "TrackAllInOne",
    type: "website",
  },
};

const contactDetails = [
  {
    title: "Email",
    value: "botobag47@gmail.com",
    href: "mailto:botobag47@gmail.com",
    description: "Send us your questions and feedback.",
    color: "bg-[#FCE9E7] text-[#C5221F]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m4 6 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "WhatsApp",
    value: "+92 331 5069439",
    href: "https://wa.me/923315069439",
    description: "Message us directly on WhatsApp.",
    color: "bg-[#E5F6E9] text-[#16833D]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.5c.3-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.4c0 .3-.1.6-.5.9-.5.3-1.1.5-1.7.4-1.2-.2-2.7-1-4-2.3-1.3-1.3-2.1-2.8-2.3-4-.1-.5.1-1.1.4-1.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "Phone",
    value: "+92 331 5069439",
    href: "tel:+923315069439",
    description: "Call us for general inquiries.",
    color: "bg-[#EAF2FF] text-[#285E9B]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M7 3h3l1.5 4.5-2 1.5a14 14 0 0 0 5.5 5.5l1.5-2L21 14v3a3 3 0 0 1-3.3 3C10.1 19.3 4.7 13.9 4 6.3A3 3 0 0 1 7 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#211D1A]">
      <Header />

      {/* HERO */}
      <section className="px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D6C7] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7A1717]">
            <span className="h-2 w-2 rounded-full bg-[#7A1717]" />
            Get In Touch
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Contact <span className="text-[#7A1717]">TrackAllInOne</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#71665E] sm:text-lg">
            Have a question, suggestion, or feedback? We'd be happy
            to hear from you. Choose your preferred way to get in touch.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactDetails.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.title === "WhatsApp" ? "_blank" : undefined}
                rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-[#E9DED2] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#D6B7A5] hover:shadow-lg sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}>
                    {item.icon}
                  </div>

                  <span className="text-xl font-bold text-[#C5B5A9] transition group-hover:text-[#7A1717]">
                    ↗
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-extrabold">
                  {item.title}
                </h2>

                <p className="mt-2 break-words font-semibold text-[#7A1717]">
                  {item.value}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#82766D]">
                  {item.description}
                </p>
              </a>
            ))}
          </div>

          {/* OWNER INFORMATION */}
          <div className="mt-8 grid gap-8 rounded-3xl border border-[#E9DED2] bg-white p-7 shadow-sm md:grid-cols-[0.8fr_1.2fr] md:items-center md:p-10">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7A1717]">
                Platform Contact
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Rahat Hussain
              </h2>

              <p className="mt-2 font-medium text-[#82766D]">
                Owner of TrackAllInOne
              </p>
            </div>

            <div>
              <p className="leading-8 text-[#71665E]">
                For general inquiries, website feedback, courier
                information corrections, or suggestions, you can
                contact Rahat Hussain using any of the contact
                methods listed above.
              </p>
            </div>
          </div>

          {/* GENERAL INQUIRIES */}
          <div className="mt-8 rounded-3xl bg-[#211D1A] p-7 text-white sm:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E6B9A3]">
                We're Listening
              </p>

              <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                How can we help you?
              </h2>

              <p className="mt-4 leading-8 text-[#D7CCC3]">
                We welcome questions about our tracking tools,
                courier directory, tracking guides, website
                functionality, and possible improvements.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FFF8ED] px-6 py-3.5 text-sm font-bold text-[#7A1717] transition hover:bg-white"
              >
                Return to Homepage →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
