
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/couriers", label: "Courier Directory" },
  { href: "/guides", label: "Tracking Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const contactLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/923315069439",
    color: "hover:text-[#25D366]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" />
        <path d="M8.5 8.5c.3 2.2 2.8 4.7 5 5l1.2-1.2 2 .9c.2.1.3.3.2.5-.3 1-1.2 1.5-2.3 1.4-3.3-.4-6.7-3.8-7.1-7.1-.1-1.1.4-2 1.4-2.3.2-.1.4 0 .5.2l.9 2-1.8.6Z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+923315069439",
    color: "hover:text-white",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 5c0-1.1.9-2 2-2Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:botobag47@gmail.com",
    color: "hover:text-[#F4B860]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#151311] px-5 pb-7 pt-14 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="TrackAllInOne home"
            >
              <img
                src="/TRACK.png"
                alt="TrackAllInOne"
                className="h-11 w-auto rounded-md bg-white object-contain p-1"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#C4BBB2]">
              One simple place to track shipments across supported courier
              and postal services. Enter your tracking number and follow
              your shipment updates with ease.
            </p>

            <Link
              href="/#tracking"
              className="mt-5 inline-flex items-center rounded-full bg-[#8B2525] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#A33131]"
            >
              Track a Shipment
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            {/* Contact icons */}
            <div className="mt-7">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                Get in Touch
              </h2>

              <div className="mt-4 flex items-center gap-3">
                {contactLinks.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={
                      contact.label === "WhatsApp" ? "_blank" : undefined
                    }
                    rel={
                      contact.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={contact.label}
                    title={contact.label}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#C4BBB2] transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 ${contact.color}`}
                  >
                    {contact.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-[#C4BBB2] transition hover:translate-x-1 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About the service */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              TrackAllInOne
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#C4BBB2]">
              An independent shipment tracking platform. Courier names,
              logos and tracking services belong to their respective owners.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/privacy"
                className="w-fit text-sm text-[#C4BBB2] transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="w-fit text-sm text-[#C4BBB2] transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-[#958B82]">
            © {new Date().getFullYear()} TrackAllInOne. All rights reserved.
          </p>

          <p className="text-xs text-[#958B82]">
            Made to make shipment tracking simpler.
          </p>
        </div>
      </div>
    </footer>
  );
}
