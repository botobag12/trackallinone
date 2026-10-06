"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-[#E5DCD0] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* =========================
            HEADER BAR
        ========================== */}
        <div className="flex min-h-[72px] items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
          >
            <img
              src="/TRACK.png"
              alt="TrackAllInOne"
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
              Hidden on mobile
          ========================== */}
          <nav className="hidden items-center gap-8 font-medium md:flex">

            <Link
              href="/"
              className="transition hover:text-[#7A1717]"
            >
              Home
            </Link>

            <Link
              href="/couriers"
              className="transition hover:text-[#7A1717]"
            >
              Couriers
            </Link>

            <Link
              href="/about"
              className="transition hover:text-[#7A1717]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#7A1717]"
            >
              Contact
            </Link>

          </nav>

          {/* =========================
              MOBILE MENU BUTTON
              Visible ONLY on mobile
          ========================== */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5DCD0] bg-white text-[#111111] transition hover:border-[#7A1717] hover:text-[#7A1717] md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              /* X */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* HAMBURGER */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* =========================
            MOBILE NAVIGATION
            Visible ONLY on mobile
        ========================== */}
        {menuOpen && (
          <nav className="border-t border-[#E5DCD0] py-3 md:hidden">

            <div className="flex flex-col">

              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium transition hover:bg-[#FFF8ED] hover:text-[#7A1717]"
              >
                Home
              </Link>

              <Link
                href="/couriers"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium transition hover:bg-[#FFF8ED] hover:text-[#7A1717]"
              >
                Couriers
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium transition hover:bg-[#FFF8ED] hover:text-[#7A1717]"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium transition hover:bg-[#FFF8ED] hover:text-[#7A1717]"
              >
                Contact
              </Link>

            </div>

          </nav>
        )}

      </div>
    </header>
  );
}