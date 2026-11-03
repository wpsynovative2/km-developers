import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function PresenceTrust() {
  const { presence, trust } = company;
  return (
    <section id="presence" className="grid bg-white lg:grid-cols-2">
      <div className="px-4 py-16 sm:px-8 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <Reveal>
          <SectionHeading eyebrow="Our" title="Presence" />
          <p className="mt-4 font-label text-sm font-semibold text-ink">{presence.subtitle}</p>
          <p className="mt-1 text-stone-600">{presence.text}</p>
        </Reveal>
        <Reveal className="relative mt-6 aspect-[1.05] w-full max-w-xl">
          <Image
            src="/images/presence.jpg"
            alt="Map with a winding road connecting our key markets"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-contain"
          />
        </Reveal>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {presence.markets.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 100} className="border-l-2 border-copper pl-4">
              <h3 className="flex items-center gap-1.5 font-label text-sm font-bold tracking-[0.12em] text-copper uppercase">
                <MapPin className="size-4" aria-hidden /> {m.name}
              </h3>
              <p className="mt-1 text-xs leading-relaxed tracking-wide text-stone-600 uppercase">{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden bg-olive px-4 py-16 text-white sm:px-8 lg:py-24 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <Reveal className="relative">
          <h2 className="font-display text-2xl tracking-[0.2em] uppercase sm:text-3xl lg:text-4xl">
            Legacy
            <span className="block">of Trust</span>
          </h2>
          <p className="mt-8 font-label text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">Our belief</p>
          <p className="mt-2 font-serif text-xl sm:text-2xl">{trust.belief}</p>
          <p className="mt-10 font-label text-sm font-bold tracking-[0.18em] text-lime-300 uppercase">
            What trust means to us
          </p>
          <ol className="mt-6 space-y-7 border-l border-white/40 pl-7">
            {trust.points.map((point) => (
              <li key={point.title} className="relative">
                <span className="absolute top-1.5 -left-[2.05rem] size-2.5 rounded-full bg-white" />
                <h3 className="font-label text-sm font-bold tracking-[0.12em] uppercase">{point.title}</h3>
                <p className="mt-1 text-sm text-white/75">{point.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
