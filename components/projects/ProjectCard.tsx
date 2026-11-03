import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { STATUS_LABEL, type Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  /** "arch" is the tall gradient-framed card from the Landmark Developments design */
  variant?: "arch" | "tile";
  className?: string;
}

export default function ProjectCard({ project, variant = "tile", className = "" }: ProjectCardProps) {
  if (variant === "arch") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group block rounded-[2.75rem] bg-gradient-to-r from-brown-deep to-brown-bright p-[5px] shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${className}`}
      >
        <article className="relative aspect-[3/4.4] overflow-hidden rounded-[2.5rem] bg-white">
          <Image
            src={project.image}
            alt={`${project.name}, ${project.location}`}
            fill
            sizes="(min-width: 1024px) 300px, 75vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-white/0 px-6 pt-16 pb-7">
            <h3 className="font-label text-base leading-tight font-bold tracking-wide text-ink uppercase">
              {project.name}
            </h3>
            <p className="mt-1 inline-block border-b-2 border-olive pb-1.5 font-label text-xs tracking-[0.3em] text-stone-700 uppercase">
              {project.location}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name}, ${project.location}`}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 font-label text-[10px] font-bold tracking-[0.15em] uppercase ${
            project.status === "ongoing" ? "bg-copper-gradient text-white" : "bg-olive text-white"
          }`}
        >
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-label text-sm font-bold tracking-wide text-ink uppercase">{project.name}</h3>
        {project.developer && <p className="text-xs text-stone-500">by {project.developer}</p>}
        <p className="mt-auto flex items-center gap-1.5 pt-2 text-xs tracking-[0.18em] text-stone-600 uppercase">
          <MapPin className="size-3.5 text-copper" aria-hidden />
          {project.location}
        </p>
      </div>
    </Link>
  );
}
