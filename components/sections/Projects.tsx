import Image from "next/image";
import LandmarkCarousel from "@/components/projects/LandmarkCarousel";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { company, projects } from "@/lib/data";

export default function Projects() {
  const ongoing = projects.filter((p) => p.status === "ongoing").length;
  const completed = projects.length - ongoing;
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects">
      {/* Project portfolio intro */}
      <div className="bg-white py-16 lg:py-24">
        <Reveal className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Project" title="Portfolio" className="lg:pl-6" />
          <span className="hidden h-36 w-1 rounded bg-gradient-to-b from-copper-light to-copper-dark lg:block" />
          <div className="space-y-4 text-justify leading-relaxed text-ink sm:text-lg">
            <p>
              From our roots in Mira-Bhayandar to growing addresses in Naigaon, Boisar and Mumbai, every KM
              Developers project is a promise delivered and another family beginning life in a home of their own.
            </p>
            <p className="font-label text-sm font-semibold tracking-[0.2em] text-copper uppercase">
              {ongoing} ongoing · {completed} completed in this portfolio
            </p>
          </div>
        </Reveal>
      </div>

      {/* Project cards on the olive → sky band */}
      <div className="relative py-16 lg:py-20">
        <div className="absolute inset-0 grid grid-rows-[3fr_1fr]">
          <div className="bg-olive" />
          <div className="relative">
            <Image src="/images/sky.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <ProjectsExplorer />
          <p className="mt-6 text-center text-[11px] text-stone-600">{company.visualNote}</p>
        </div>
      </div>

      {/* Landmark developments */}
      <div className="bg-pattern relative overflow-hidden pt-16 lg:pt-24">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
          <Reveal>
            <SectionHeading eyebrow="Landmark" title="Developments" />
            <div className="mt-8 border-l-4 border-copper pl-6 text-justify leading-relaxed text-ink sm:text-lg">
              <p>
                Our landmark developments bring together everything we stand for: thoughtful planning, trusted
                materials, lifestyle amenities and a firm commitment to possession timelines. Each one is designed
                around a single question: does this make life better for the person who lives here?
              </p>
            </div>
          </Reveal>
          <LandmarkCarousel items={featured} />
        </div>
        <Image
          src="/images/grass-strip.jpg"
          alt=""
          width={1920}
          height={411}
          sizes="100vw"
          className="pointer-events-none mt-4 h-auto w-full mix-blend-multiply lg:-mt-16"
        />
      </div>
    </section>
  );
}
