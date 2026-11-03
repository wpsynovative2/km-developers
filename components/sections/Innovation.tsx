import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { company } from "@/lib/data";

export default function Innovation() {
  const { innovation, future } = company;
  const [innovationA, innovationB] = innovation.title.split(" & ");
  const [futureA, futureB] = future.title.split(" ");
  return (
    <section id="innovation" className="relative overflow-hidden bg-[#4a1e08] text-white">
      <Image
        src="/images/innovation.jpg"
        alt="A family at home, seen through a glowing keyhole"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55 lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-black/60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:min-h-[44rem] lg:grid-cols-[1fr_0.9fr_1fr] lg:items-end lg:py-24">
        <Reveal className="lg:text-right">
          <div className="space-y-4 text-sm leading-relaxed text-white/85 sm:text-base">
            {innovation.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h2 className="mt-8 font-display text-2xl tracking-[0.2em] uppercase sm:text-3xl">
            {innovationA} &amp;
            <span className="block font-bold">{innovationB}</span>
          </h2>
        </Reveal>
        <div className="hidden lg:block" />
        <Reveal className="lg:self-center">
          <h2 className="font-display text-2xl tracking-[0.2em] uppercase sm:text-3xl">
            {futureA}
            <span className="block font-bold">{futureB}</span>
          </h2>
          <ul className="mt-8 space-y-6">
            {future.points.map((point) => (
              <li key={point.title}>
                <h3 className="font-label text-sm font-bold tracking-[0.14em] text-copper-light uppercase">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/80">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
