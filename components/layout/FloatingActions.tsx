"use client";

import { MessageSquareText, Phone } from "lucide-react";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { company, telHref, whatsappHref } from "@/lib/data";

/** WhatsApp bubble on desktop, plus a sticky call / enquire bar on mobile. */
export default function FloatingActions() {
  const { openEnquiry } = useEnquiry();
  const { contact } = company;
  const whatsapp = whatsappHref(contact.whatsapp, "Hi KM Developers, I'd like to know more.");

  return (
    <>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-5 bottom-5 z-30 hidden size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-105 md:grid"
      >
        <WhatsAppIcon className="size-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-stone-200 bg-white/95 backdrop-blur md:hidden">
        <a href={telHref(contact.phones[0])} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-ink">
          <Phone className="size-5 text-copper" aria-hidden /> Call
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-ink"
        >
          <WhatsAppIcon className="size-5 text-[#25d366]" /> WhatsApp
        </a>
        <button
          type="button"
          onClick={() => openEnquiry({ source: "Mobile sticky bar" })}
          className="bg-copper-gradient flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-white"
        >
          <MessageSquareText className="size-5" aria-hidden /> Enquire
        </button>
      </div>
    </>
  );
}
