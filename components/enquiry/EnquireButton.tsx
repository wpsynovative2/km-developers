"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "./EnquiryProvider";
import { ArrowCircle } from "@/components/ui/CtaButton";

interface EnquireButtonProps {
  children?: ReactNode;
  project?: string;
  source: string;
  variant?: "copper" | "outline";
  className?: string;
}

export default function EnquireButton({
  children = "Enquire Now",
  project,
  source,
  variant = "copper",
  className = "",
}: EnquireButtonProps) {
  const { openEnquiry } = useEnquiry();
  const styles =
    variant === "copper"
      ? "bg-copper-gradient text-white shadow-lg shadow-copper-dark/30"
      : "border border-current text-current";

  return (
    <button
      type="button"
      onClick={() => openEnquiry({ project, source })}
      className={`group inline-flex items-center gap-3 rounded-xl py-2 pr-2 pl-5 font-label text-sm font-bold tracking-wide uppercase transition hover:brightness-110 sm:text-base ${styles} ${className}`}
    >
      {children}
      <ArrowCircle />
    </button>
  );
}
