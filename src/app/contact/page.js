import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export const metadata = {
  title: "Contact TrackAllInOne",
  description:
    "Contact TrackAllInOne for questions, feedback, corrections, or general inquiries about our courier tracking directory.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF8ED] text-[#111111]">

      {/* HEADER */}

      <Header />

      {/* HERO */}

      <section className="px-6 py-20 text-center">

        <div className="mx-auto max-w-4xl">

          <p className="font-semibold uppercase tracking-[0.2em] text-[#7A1717]">
            Get In Touch
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Contact TrackAllInOne
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#625B55]">
            Have a question, suggestion, or found an issue with
            one of our courier listings? We would be happy to
            hear from you.
          </p>

        </div>

      </section>

      {/* CONTACT CONTENT */}

      <section className="px-6 pb-20">

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

          {/* CONTACT INFORMATION */}

          <div className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-bold">
              Contact Information
            </h2>

            <p className="mt-4 leading-7 text-[#625B55]">
              For general questions, feedback, corrections, or
              suggestions regarding TrackAllInOne, you can contact
              us using the information below.
            </p>

            <div className="mt-8">

              <h3 className="font-bold">
                Email
              </h3>

              <p className="mt-2 text-[#625B55]">
                contact@trackallinone.com
              </p>

            </div>

            <div className="mt-6">

              <h3 className="font-bold">
                General Inquiries
              </h3>

              <p className="mt-2 leading-7 text-[#625B55]">
                We welcome feedback about courier information,
                tracking links, website functionality, and
                suggestions for additional courier services.
              </p>

            </div>

          </div>

          {/* CONTACT FORM */}

          <div className="rounded-2xl border border-[#E5DCD0] bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-bold">
              Send Us a Message
            </h2>

            <form className="mt-6">

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-3 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
                />

              </div>

              <div className="mt-5">

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-3 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
                />

              </div>

              <div className="mt-5">

                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What is your message about?"
                  className="w-full rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-3 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
                />

              </div>

              <div className="mt-5">

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-[#E5DCD0] bg-[#FFF8ED] px-4 py-3 outline-none transition focus:border-[#7A1717] focus:ring-2 focus:ring-[#7A1717]/20"
                />

              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#7A1717] px-6 py-4 font-bold text-white transition hover:bg-[#941F1F]"
              >
                SEND MESSAGE
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* FOOTER */}

    < Footer />

    </main>
  );
}