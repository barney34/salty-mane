"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SALON_PHONE, SALON_PHONE_DISPLAY } from "@/lib/business";
import { BOOK_SMS_GENERAL } from "@/lib/booking";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/quiz", label: "Find Your Stylist" },
  { href: "/faq", label: "FAQ" },
  { href: "/book", label: "Book Online" },
];

const MENU_ID = "mobile-nav-menu";

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C9A96E]/20">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-[#1A1A2E] tracking-wide">
          The Salty Mane
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm text-[#8B7355] hover:text-[#1A1A2E] transition-colors font-medium tracking-wide"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${SALON_PHONE}`}
            className="text-sm text-[#8B7355] hover:text-[#1A1A2E] transition-colors"
          >
            {SALON_PHONE_DISPLAY}
          </a>
          <a
            href={BOOK_SMS_GENERAL}
            className="bg-[#C9A96E] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#8B7355] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
          >
            Book Now
          </a>
        </div>

        <button
          ref={buttonRef}
          className="md:hidden p-2 text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] rounded-md"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={MENU_ID}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id={MENU_ID}
          className="md:hidden bg-[#FAF7F2] border-t border-[#C9A96E]/20 px-6 py-4 space-y-3"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 text-[#8B7355] hover:text-[#1A1A2E] font-medium transition-colors"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <a
            href={BOOK_SMS_GENERAL}
            className="block text-center bg-[#C9A96E] text-white font-medium py-3 rounded-full hover:bg-[#8B7355] transition-colors mt-3"
            onClick={closeMenu}
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}
