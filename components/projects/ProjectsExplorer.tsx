"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { ArrowCircle } from "@/components/ui/CtaButton";
import { projects, type ProjectStatus } from "@/lib/data";

type Filter = "all" | ProjectStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

const INITIAL_COUNT = 8;

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-3">
        {FILTERS.map(({ value, label }) => {
          const count = value === "all" ? projects.length : projects.filter((p) => p.status === value).length;
          const active = filter === value;
          return (
            <button
              key={value}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setFilter(value);
                setExpanded(false);
              }}
              className={`rounded-full px-5 py-2.5 font-label text-xs font-bold tracking-[0.18em] uppercase transition sm:text-sm ${
                active ? "bg-white text-olive shadow-lg" : "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"
              }`}
            >
              {label} <span className={active ? "text-copper" : "text-white/60"}>({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group bg-copper-gradient inline-flex items-center gap-3 rounded-xl py-2 pr-2 pl-5 font-label text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-copper-dark/30 transition hover:brightness-110 sm:text-base"
          >
            {expanded ? "Show less" : `Know more (${filtered.length - INITIAL_COUNT} more)`}
            <ArrowCircle />
          </button>
        </div>
      )}
    </div>
  );
}
