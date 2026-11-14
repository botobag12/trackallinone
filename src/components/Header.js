
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/guides", label: "Guides" },
  { href: "/couriers", label: "Couriers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="relative z-40 w-full border-b border-[#EEE5D9] bg-[#FFFDF9] shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main header row */}
        <div className="flex min-h-[68px] items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center"
            aria-label="TrackAllInOne home"
          >
            <img
              src="/TRACK.png"
              alt="TrackAllInOne"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-[#F7EAE5] text-[#7A1717]"
                    : "text-[#514943] hover:bg-[#F8F2E9] hover:text-[#7A1717]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/#tracking"
              className="ml-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#7A1717] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#5F1010]"
            >
              Track a Parcel
              <span aria-hidden="true">→</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E9DED2] bg-white text-[#25201D] transition hover:border-[#7A1717] hover:text-[#7A1717] md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

        {/* Mobile navigation */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-[#EEE5D9] py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-[#F7EAE5] text-[#7A1717]"
                      : "text-[#514943] hover:bg-[#F8F2E9] hover:text-[#7A1717]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/#tracking"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#7A1717] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#5F1010]"
              >
                Track Your Shipment
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
