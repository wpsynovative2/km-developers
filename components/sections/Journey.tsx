import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Journey() {
  const { journey } = company;
  const [plain, accent] = journey.title.split(" ");
  return (
    <section id="journey" className="relative overflow-hidden bg-cream pt-20 lg:pt-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow={plain} title={accent} />
          <p className="mt-3 font-label text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase">
            {journey.subtitle}
          </p>
        </Reveal>

        <ol className="relative mt-14 grid gap-8 border-l-2 border-copper/60 pl-8 lg:grid-cols-6 lg:gap-6 lg:border-t-2 lg:border-l-0 lg:pt-10 lg:pl-0">
          {journey.steps.map((step, i) => (
            <Reveal as="li" key={step.label} delay={i * 90} className="relative">
              <span className="absolute top-1.5 -left-[2.4rem] size-3.5 rounded-full bg-copper ring-4 ring-copper/25 lg:-top-[2.95rem] lg:left-0" />
              <h3 className="text-copper-gradient font-display text-lg uppercase">{step.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      <Image
        src="/images/landscape-hills.jpg"
        alt="Green hills overlooking a growing city"
        width={1920}
        height={528}
        sizes="100vw"
        className="mt-4 h-auto w-full mix-blend-multiply lg:-mt-24"
      />
    </section>
  );
}
