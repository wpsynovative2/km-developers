import Image from "next/image";
import { Phone } from "lucide-react";
import EnquireButton from "@/components/enquiry/EnquireButton";
import Reveal from "@/components/ui/Reveal";
import { company, telHref } from "@/lib/data";

interface CtaBannerProps {
  title: string;
  text: string;
  source: string;
  image?: string;
}

export default function CtaBanner({ title, text, source, image = "/images/cover.jpg" }: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden py-20 text-white lg:py-24">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brown-deep via-brown-deep/85 to-brown-bright/50" />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-4 text-white/80 sm:text-lg">{text}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <EnquireButton source={source}>Enquire Now</EnquireButton>
          <a
            href={telHref(company.contact.phones[0])}
            className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-5 py-3.5 font-label text-sm font-bold tracking-wide uppercase transition hover:bg-white hover:text-brown"
          >
            <Phone className="size-4" aria-hidden /> {company.contact.phones[0]}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
