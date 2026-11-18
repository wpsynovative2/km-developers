import Image from "next/image";
import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Testimonials() {
  const { testimonials } = company;
  return (
    <section id="testimonials" className="relative overflow-hidden bg-olive-dark py-20 text-white lg:py-28">
      <Image
        src={testimonials.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-olive-dark/95" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-14 text-center">
          <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} tone="light" align="center" />
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{testimonials.text}</p>
        </Reveal>

        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {testimonials.items.map((t, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 120}
              className="relative flex flex-col rounded-[2rem] bg-white/95 p-8 pt-12 text-ink shadow-2xl ring-1 ring-black/5 backdrop-blur"
            >
              <Quote
                className="bg-copper-gradient absolute -top-6 left-8 size-12 rounded-full p-3 text-white shadow-lg"
                aria-hidden
              />
              <blockquote className="flex-1 font-serif text-lg leading-relaxed text-stone-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 border-t border-stone-200 pt-5">
                <p className="font-serif text-xl font-semibold text-brown">{t.name}</p>
                <p className="font-label text-xs font-semibold tracking-[0.2em] text-copper uppercase">{t.project}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
