"use client";

import { useRef } from "react";
import { ChevronLeft } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { ArrowCircle } from "@/components/ui/CtaButton";
import type { Project } from "@/lib/data";

export default function LandmarkCarousel({ items }: { items: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : track.clientWidth * 0.8;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pt-2 pb-6"
      >
        {items.map((project) => (
          <div key={project.slug} data-card className="w-[72vw] max-w-[18rem] shrink-0 snap-start sm:w-64 lg:w-72">
            <ProjectCard project={project} variant="arch" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous project"
          className="grid size-12 place-items-center rounded-xl border border-copper text-copper transition hover:bg-copper hover:text-white"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="group bg-copper-gradient inline-flex items-center gap-6 rounded-xl py-2 pr-2 pl-12 font-label text-base font-bold tracking-wide text-white uppercase shadow-lg shadow-copper-dark/30 transition hover:brightness-110"
        >
          Swipe
          <ArrowCircle />
        </button>
      </div>
    </div>
  );
}
