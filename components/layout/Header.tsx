"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import EnquireButton from "@/components/enquiry/EnquireButton";
import { company, telHref } from "@/lib/data";
import { NAV_LINKS } from "@/lib/nav";

/** `overlay` renders the header transparent over the hero until the page scrolls. */
export default function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:py-4">
        <Link href="/#home" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="KM Developers – Creating Lifestyle"
            width={1344}
            height={530}
            preload
            className={`h-auto transition-all duration-300 ${solid ? "w-32 sm:w-36" : "w-36 sm:w-48 lg:w-56"}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label text-[13px] font-medium tracking-[0.12em] uppercase transition hover:text-copper ${
                solid ? "text-ink" : "text-white drop-shadow"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <EnquireButton source="Header" className="hidden !py-1.5 !text-xs sm:inline-flex">
            Enquire Now
          </EnquireButton>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`grid size-11 place-items-center rounded-full xl:hidden ${
              solid ? "text-ink" : "bg-white/20 text-white backdrop-blur"
            }`}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-stone-100 bg-white px-4 pb-6 xl:hidden"
        >
          <ul className="divide-y divide-stone-100">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 font-label text-sm font-semibold tracking-[0.14em] text-ink uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <EnquireButton source="Mobile menu">Enquire Now</EnquireButton>
            <a
              href={telHref(company.contact.phones[0])}
              className="inline-flex items-center gap-2 rounded-xl border border-copper px-4 py-2 font-label text-sm font-bold text-copper uppercase"
            >
              <Phone className="size-4" /> Call
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
