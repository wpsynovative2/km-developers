import Image from "next/image";
import CountUp from "@/components/ui/CountUp";
import Laurel from "@/components/ui/Laurel";
import Reveal from "@/components/ui/Reveal";
import { company } from "@/lib/data";

export default function Achievements() {
  const { milestones, stats } = company;
  return (
    <section id="achievements" className="bg-brown-gradient relative overflow-hidden py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-label text-xs font-semibold tracking-[0.35em] text-copper-light uppercase">
            Our Achievements
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-[0.12em] uppercase sm:text-3xl">{milestones.subtitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{milestones.text}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120} className="flex flex-col items-center sm:items-start">
              <div className="relative mx-auto w-64 max-w-full">
                <Laurel className="w-full" />
                <span className="absolute inset-0 grid place-items-center pb-3 font-display text-3xl xl:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
              </div>
              <p className="mx-auto mt-6 max-w-[16rem] border-l-4 border-copper pl-6 font-label text-sm leading-loose tracking-[0.2em] uppercase sm:text-base">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <Reveal className="relative hidden min-h-56 overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/milestones.jpg"
              alt="A man celebrating freedom on an aircraft wing above the city"
              fill
              sizes="480px"
              className="object-cover"
            />
          </Reveal>
          {milestones.highlights.map((h, i) => (
            <Reveal
              key={h.title}
              delay={i * 120}
              className="flex flex-col justify-center rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur"
            >
              <h3 className="text-copper-gradient font-display text-xl uppercase sm:text-2xl">{h.title}</h3>
              <p className="mt-3 font-label text-xs leading-relaxed tracking-[0.2em] text-white/80 uppercase">{h.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
