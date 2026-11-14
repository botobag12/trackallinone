
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/couriers", label: "Courier Directory" },
  { href: "/guides", label: "Tracking Guides" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
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
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Explore
            </h2>

            <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-3">
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
