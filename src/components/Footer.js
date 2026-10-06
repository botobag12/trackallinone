import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] px-6 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        {/* MAIN FOOTER */}

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* BRAND */}

          <div className="text-center md:text-left">

            <Link
              href="/"
              className="text-xl font-bold transition hover:text-[#E5DCD0]"
            >
              TrackAllInOne
            </Link>

            <p className="mt-2 text-sm text-gray-400">
              Universal shipment tracking for major courier services.
            </p>

          </div>

          {/* MAIN LINKS */}

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">

            <Link
              href="/"
              className="transition hover:text-[#E5DCD0]"
            >
              Home
            </Link>

            <Link
              href="/couriers"
              className="transition hover:text-[#E5DCD0]"
            >
              Couriers
            </Link>

            <Link
              href="/about"
              className="transition hover:text-[#E5DCD0]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#E5DCD0]"
            >
              Contact
            </Link>

          </nav>

        </div>

        {/* DIVIDER */}

        <div className="my-8 border-t border-gray-800"></div>

        {/* LEGAL LINKS */}

        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">

          <p className="text-gray-500">
            © {new Date().getFullYear()} TrackAllInOne. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy"
              className="text-gray-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-400 transition hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}