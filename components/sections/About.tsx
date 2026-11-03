import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-pattern relative overflow-hidden pt-20 lg:pt-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-4xl border-l-4 border-copper pl-6 sm:pl-10 lg:ml-12">
          <SectionHeading title={company.about.title} />
          <div className="mt-6 space-y-4 text-justify text-base leading-relaxed text-ink sm:text-lg">
            {company.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
      <Image
        src="/images/about-city.jpg"
        alt="A green city skyline connected by flyovers"
        width={1920}
        height={520}
        sizes="100vw"
        className="mt-8 h-auto w-full mix-blend-multiply lg:mt-4"
      />
    </section>
  );
}
