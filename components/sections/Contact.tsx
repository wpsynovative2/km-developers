import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import { WhatsAppIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company, telHref, whatsappHref } from "@/lib/data";

function Corner({ className }: { className: string }) {
  return <span className={`absolute size-10 border-white sm:size-14 ${className}`} aria-hidden />;
}

export default function Contact() {
  const { contact } = company;
  const rows = [
    ...contact.phones.map((phone) => ({ icon: Phone, label: phone, href: telHref(phone), large: true })),
    { icon: WhatsAppIcon, label: "Chat on WhatsApp", href: whatsappHref(contact.whatsapp, "Hi KM Developers, I'd like to know more."), large: false },
    { icon: Mail, label: contact.email, href: `mailto:${contact.email}`, large: false },
    { icon: MapPin, label: contact.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`, large: false },
  ];

  return (
    <section id="contact" className="bg-pattern py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center">
          <SectionHeading eyebrow="Contact" title="Us" align="center" />
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Looking for a home you can be proud to own? Talk to us. We would love to help you find it.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="rounded-[2.5rem] bg-olive p-8 text-white shadow-2xl sm:p-12">
            <div className="relative mx-auto grid aspect-[4/3] max-w-sm place-items-center p-10">
              <Corner className="top-0 left-0 border-t-4 border-l-4" />
              <Corner className="top-0 right-0 border-t-4 border-r-4" />
              <Corner className="bottom-0 left-0 border-b-4 border-l-4" />
              <Corner className="right-0 bottom-0 border-r-4 border-b-4" />
              <Image src="/images/logo-white.png" alt="KM Developers" width={600} height={240} className="h-auto w-full" />
            </div>

            <ul className="mt-10 space-y-5">
              {rows.map(({ icon: Icon, label, href, large }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5"
                  >
                    <span className="bg-copper-gradient grid size-12 shrink-0 place-items-center rounded-full shadow-lg">
                      <Icon className="size-6 text-white" aria-hidden />
                    </span>
                    <span
                      className={`group-hover:text-copper-light transition ${large ? "text-2xl font-semibold tracking-wider sm:text-3xl" : "text-base tracking-wide sm:text-lg"}`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-black/5 sm:p-12">
            <p className="font-label text-xs font-semibold tracking-[0.25em] text-copper uppercase">Send an enquiry</p>
            <h3 className="mt-2 mb-6 font-display text-2xl text-ink">We&apos;ll call you back</h3>
            <EnquiryForm source="Contact section" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
