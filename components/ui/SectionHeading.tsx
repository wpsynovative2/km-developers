import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Plain first line, e.g. "Project" in "Project Portfolio" */
  eyebrow?: string;
  title: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/** Two-line heading from the design: plain wide caps line + copper gradient line. */
export default function SectionHeading({
  eyebrow,
  title,
  tone = "dark",
  align = "left",
  className = "",
  children,
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`font-display text-xl tracking-[0.25em] uppercase sm:text-2xl lg:text-3xl ${tone === "light" ? "text-white" : "text-ink"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-copper-gradient font-display text-3xl leading-tight tracking-[0.08em] uppercase sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children}
    </div>
  );
}
