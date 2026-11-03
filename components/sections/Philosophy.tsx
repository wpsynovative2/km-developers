import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Philosophy() {
  const { philosophy, overview } = company;
  const [plain, accent] = philosophy.title.split(" ");
  return (
    <section id="philosophy" className="relative overflow-hidden bg-sky-100">
      <div className="relative aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src="/images/philosophy.jpg"
          alt="A couple enjoying coffee on their balcony overlooking the city"
          fill
          sizes="100vw"
          className="object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/85 via-white/40 to-transparent lg:block" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-28">
        <Reveal className="max-w-xl">
          <SectionHeading eyebrow={plain} title={accent} />
          <p className="mt-6 font-serif text-xl font-semibold text-brown sm:text-2xl">{philosophy.lead}</p>
          <p className="mt-4 leading-relaxed text-ink">{overview.paragraphs[1]}</p>
          <p className="mt-8 font-label text-xs font-semibold tracking-[0.25em] text-ink uppercase">
            Our brand philosophy brings together five principles
          </p>
        </Reveal>
        <Reveal className="mt-4 flex max-w-3xl flex-wrap gap-y-2 rounded-lg bg-olive-dark px-4 lg:bg-transparent lg:bg-gradient-to-r lg:from-olive-dark lg:via-olive-dark/90 lg:to-olive-dark/0 py-3 text-white">
          {philosophy.principles.map((p) => (
            <span key={p} className="border-l border-white/60 px-4 font-label text-sm font-semibold tracking-[0.12em] uppercase sm:px-6">
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
