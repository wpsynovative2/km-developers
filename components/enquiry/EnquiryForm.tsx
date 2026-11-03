"use client";

import { useId, useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { projects } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

interface EnquiryFormProps {
  defaultProject?: string;
  source: string;
  tone?: "light" | "dark";
}

const PHONE_PATTERN = /^\+?[\d\s-]{10,15}$/;

export default function EnquiryForm({
  defaultProject = "",
  source,
  tone = "light",
}: EnquiryFormProps) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!PHONE_PATTERN.test(data.phone.trim())) {
      setStatus("error");
      setError("Please enter a valid phone number.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, page: window.location.href }),
      });
      const result = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !result.ok) throw new Error(result.error || "Something went wrong.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const dark = tone === "dark";
  const field =
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 " +
    (dark
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-copper-light focus:ring-copper-light/30"
      : "border-stone-200 bg-white text-ink placeholder:text-stone-400 focus:border-copper focus:ring-copper/25");
  const label = `mb-1.5 block text-xs font-label font-semibold uppercase tracking-[0.14em] ${dark ? "text-white/80" : "text-stone-600"}`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
        <CircleCheck className="size-14 text-copper" aria-hidden />
        <h3 className={`font-display text-xl ${dark ? "text-white" : "text-ink"}`}>Thank you!</h3>
        <p className={`max-w-sm text-sm ${dark ? "text-white/80" : "text-stone-600"}`}>
          Your enquiry has been received. Our team will get in touch with you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-copper underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-4">
      {/* Honeypot: hidden from people, tempting for bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Full name *
        </label>
        <input
          id={`${id}-name`}
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          placeholder="Your name"
          className={field}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Phone *
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            maxLength={120}
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-project`} className={label}>
          Interested in
        </label>
        <select
          id={`${id}-project`}
          name="project"
          defaultValue={defaultProject}
          className={`${field} ${dark ? "[&>option]:text-ink" : ""}`}
        >
          <option value="">General enquiry</option>
          <optgroup label="Ongoing projects">
            {projects
              .filter((p) => p.status === "ongoing")
              .map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name} – {p.location}
                </option>
              ))}
          </optgroup>
          <optgroup label="Completed projects">
            {projects
              .filter((p) => p.status === "completed")
              .map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name} – {p.location}
                </option>
              ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          maxLength={1000}
          placeholder="Tell us what you are looking for"
          className={`${field} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-copper-gradient mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-label text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-copper/30 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            Submit enquiry <Send className="size-4" aria-hidden />
          </>
        )}
      </button>
      <p className={`text-center text-[11px] ${dark ? "text-white/60" : "text-stone-500"}`}>
        By submitting, you agree to be contacted by KM Developers regarding your enquiry.
      </p>
    </form>
  );
}
