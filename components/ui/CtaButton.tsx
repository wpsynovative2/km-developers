import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function ArrowCircle() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-copper transition group-hover:translate-x-0.5 sm:size-9">
      <ChevronRight className="size-5" aria-hidden />
    </span>
  );
}

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Copper pill link with the round arrow, matching the design's "Know More" button. */
export default function CtaLink({ href, children, className = "" }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={`group bg-copper-gradient inline-flex items-center gap-3 rounded-xl py-2 pr-2 pl-5 font-label text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-copper-dark/30 transition hover:brightness-110 sm:text-base ${className}`}
    >
      {children}
      <ArrowCircle />
    </Link>
  );
}
