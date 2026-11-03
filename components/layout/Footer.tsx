import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, telHref } from "@/lib/data";
import { NAV_LINKS } from "@/lib/nav";

export default function Footer() {
  const { contact } = company;
  return (
    <footer className="bg-olive-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <Image src="/images/logo-white.png" alt="KM Developers" width={600} height={240} className="h-auto w-48" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            A history of building, a future of lasting value. Creating quality homes across Boisar, Naigaon and
            Mira-Bhayandar since 2009.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-label text-xs font-bold tracking-[0.25em] text-copper-light uppercase">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-copper-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-label text-xs font-bold tracking-[0.25em] text-copper-light uppercase">Reach us</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={telHref(contact.phones[0])} className="flex items-center gap-3 hover:text-copper-light">
                <Phone className="size-4 shrink-0" aria-hidden /> {contact.phones[0]}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-copper-light">
                <Mail className="size-4 shrink-0" aria-hidden /> {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden /> {contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl space-y-4 px-4 pt-8 pb-24 sm:px-6 md:pb-8">
          <p className="text-[11px] leading-relaxed text-white/55">{company.disclaimer}</p>
          <p className="text-xs text-white/60">© KM Developers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
