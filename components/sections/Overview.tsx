import Image from "next/image";
import Leaves from "@/components/ui/Leaves";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data";

export default function Overview() {
  return (
    <section id="overview" className="bg-pattern relative overflow-hidden pt-20 lg:pt-28">
      <Leaves
        items={[
          { leaf: 4, className: "top-[30%] left-[3%] hidden lg:block", size: 54 },
          { leaf: 5, className: "top-[55%] left-[55%] hidden lg:block", size: 40, slow: true },
          { leaf: 2, className: "top-[48%] left-[64%] hidden lg:block", size: 34 },
        ]}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-2xl border-l-4 border-copper pl-6 sm:pl-10 lg:ml-12">
          <SectionHeading title={company.overview.title} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink sm:text-lg">
            {company.overview.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif text-xl font-semibold text-brown sm:text-2xl" : "text-justify"}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
      <Image
        src="/images/elevation.webp"
        alt="Landscaped boulevard leading to a glass high-rise"
        width={1672}
        height={941}
        sizes="100vw"
        className="relative mt-8 h-auto w-full lg:-mt-72 xl:-mt-96"
      />
    </section>
  );
}
