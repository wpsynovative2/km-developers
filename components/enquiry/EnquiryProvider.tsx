"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

interface EnquiryOptions {
  project?: string;
  source?: string;
}

interface EnquiryContextValue {
  openEnquiry: (options?: EnquiryOptions) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [options, setOptions] = useState<EnquiryOptions & { key: number }>({ key: 0 });

  const openEnquiry = useCallback((next: EnquiryOptions = {}) => {
    setOptions((prev) => ({ ...next, key: prev.key + 1 }));
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Lock page scroll while the dialog is open
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => {
      document.documentElement.style.overflow = dialog.open ? "hidden" : "";
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="enquiry-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[min(100%-2rem,56rem)] overflow-hidden rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="grid max-h-[90svh] overflow-y-auto md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden min-h-full md:block">
            <Image
              src="/images/projects/narmada-mohan-atlantis.jpg"
              alt=""
              fill
              sizes="400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-deep via-brown-deep/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <Image
                src="/images/logo-white.png"
                alt="KM Developers"
                width={180}
                height={70}
                className="mb-5 h-auto w-40"
              />
              <p className="font-serif text-2xl leading-snug">
                A home is a long-term investment. So should be the trust behind it.
              </p>
            </div>
          </div>

          <div className="relative p-6 sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close enquiry form"
              className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            >
              <X className="size-5" />
            </button>
            <p className="font-label text-xs font-semibold tracking-[0.25em] text-copper uppercase">
              Get in touch
            </p>
            <h2 id="enquiry-title" className="mt-2 mb-1 font-display text-2xl text-ink">
              Enquire Now
            </h2>
            <p className="mb-6 text-sm text-stone-500">
              Share your details and our team will call you back.
            </p>
            <EnquiryForm
              key={options.key}
              defaultProject={options.project}
              source={options.source ?? "Popup"}
            />
          </div>
        </div>
      </dialog>
    </EnquiryContext.Provider>
  );
}
