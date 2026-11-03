import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { company } from "@/lib/data";

function Block({ title, text, align }: { title: string; text: string; align: "left" | "right" }) {
  const [plain, accent] = title.split(" ");
  const right = align === "right";
  return (
    <Reveal className={`flex flex-col ${right ? "lg:items-end lg:text-right" : ""}`}>
      <div className={`${right ? "lg:border-r-4 lg:border-l-0 lg:pr-6 lg:pl-0" : ""} border-l-4 border-copper pl-6`}>
        <p className="leading-relaxed text-ink">{text}</p>
        <h2 className="mt-6 font-display text-2xl tracking-[0.2em] text-ink uppercase sm:text-3xl">
          {plain}
          <span className="text-copper-gradient block">{accent}</span>
        </h2>
      </div>
    </Reveal>
  );
}

export default function VisionMission() {
  return (
    <section id="vision" className="bg-pattern py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-12">
        <Block title={company.vision.title} text={company.vision.text} align="right" />
        <Reveal className="relative order-first aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl lg:order-none lg:aspect-[4/4.4]">
          <Image
            src="/images/vision.jpg"
            alt="A family enjoying time together on their terrace"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[45%_center]"
          />
        </Reveal>
        <Block title={company.mission.title} text={company.mission.text} align="left" />
      </div>
    </section>
  );
}
