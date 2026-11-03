import Image from "next/image";
import { Quote } from "lucide-react";
import EnquireButton from "@/components/enquiry/EnquireButton";
import Leaves from "@/components/ui/Leaves";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Team() {
  const { founders } = company;
  return (
    <section id="team" className="bg-pattern relative overflow-hidden py-20 lg:py-28">
      <Leaves
        items={[
          { leaf: 2, className: "top-[12%] right-[6%]", size: 48 },
          { leaf: 6, className: "bottom-[10%] left-[4%]", size: 58, slow: true },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center">
          <SectionHeading eyebrow="Our Team" title="Leadership" align="center" />
          <p className="mx-auto mt-4 max-w-2xl text-stone-600">
            KM Developers is led by the Kadam and Mehta families, whose partnership since 2009 has shaped every
            home we build.
          </p>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative mx-auto w-full max-w-md">
            <Image
              src={founders.image}
              alt={`${founders.names}, ${founders.role}`}
              width={900}
              height={1248}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="h-auto w-full drop-shadow-2xl"
            />
          </Reveal>

          <Reveal className="relative rounded-[2rem] bg-white/80 p-8 shadow-xl ring-1 ring-black/5 backdrop-blur sm:p-12">
            <Quote className="absolute -top-6 left-8 size-12 rounded-full bg-copper-gradient p-3 text-white" aria-hidden />
            <h3 className="font-display text-xl tracking-[0.2em] text-ink uppercase">{founders.title}</h3>
            <div className="mt-6 space-y-4 leading-relaxed text-stone-700">
              {founders.message.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-stone-200 pt-6">
              <div>
                <p className="font-serif text-2xl font-semibold text-brown">{founders.names}</p>
                <p className="font-label text-xs font-semibold tracking-[0.25em] text-stone-500 uppercase">
                  {founders.role}
                </p>
              </div>
              <EnquireButton source="Team">Connect with us</EnquireButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
