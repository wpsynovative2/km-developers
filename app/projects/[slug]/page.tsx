import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, ChevronRight, MapPin, Phone } from "lucide-react";
import EnquireButton from "@/components/enquiry/EnquireButton";
import Header from "@/components/layout/Header";
import ProjectCard from "@/components/projects/ProjectCard";
import CtaBanner from "@/components/sections/CtaBanner";
import { SERVICE_ICONS, WhatsAppIcon } from "@/components/ui/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  STATUS_LABEL,
  company,
  getProject,
  getRelatedProjects,
  projects,
  telHref,
  whatsappHref,
} from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name}, ${project.location}`,
    description: project.description[0],
    openGraph: { images: [project.image] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = getRelatedProjects(project, 4);
  const { contact } = company;

  const facts = [
    { label: "Status", value: STATUS_LABEL[project.status] },
    { label: "Location", value: project.location },
    { label: "Market", value: project.market },
    { label: "Developer", value: project.developer ?? "KM Developers" },
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <Image src="/images/sky.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
            <div className="mx-auto w-full max-w-md rounded-[3rem] bg-gradient-to-r from-brown-deep to-brown-bright p-[6px] shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.65rem] bg-white">
                <Image
                  src={project.image}
                  alt={`${project.name}, ${project.location}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 450px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs tracking-wide text-stone-600 uppercase">
                <Link href="/" className="hover:text-copper">
                  Home
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
                <Link href="/#projects" className="hover:text-copper">
                  Projects
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
                <span className="text-ink">{project.name}</span>
              </nav>

              <span
                className={`inline-block rounded-full px-4 py-1.5 font-label text-xs font-bold tracking-[0.2em] text-white uppercase ${
                  project.status === "ongoing" ? "bg-copper-gradient" : "bg-olive"
                }`}
              >
                {STATUS_LABEL[project.status]} project
              </span>
              <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-brown sm:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              {project.developer && <p className="mt-2 text-stone-600">by {project.developer}</p>}
              <p className="mt-4 flex items-center gap-2 border-b-2 border-olive pb-2 font-label text-sm tracking-[0.3em] text-ink uppercase sm:inline-flex">
                <MapPin className="size-4 text-copper" aria-hidden /> {project.location}
              </p>

              <div className="mt-8 space-y-4 leading-relaxed text-ink sm:text-lg">
                {project.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <EnquireButton project={project.name} source={`Project page: ${project.name}`}>
                  Enquire about this project
                </EnquireButton>
                <a
                  href={telHref(contact.phones[0])}
                  className="inline-flex items-center gap-2 rounded-xl border border-copper bg-white/70 px-4 py-3 font-label text-sm font-bold text-copper uppercase transition hover:bg-white"
                >
                  <Phone className="size-4" aria-hidden /> Call
                </a>
                <a
                  href={whatsappHref(contact.whatsapp, `Hi KM Developers, I'm interested in ${project.name}, ${project.location}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#25d366] bg-white/70 px-4 py-3 font-label text-sm font-bold text-[#128c4a] uppercase transition hover:bg-white"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </div>
              <p className="mt-6 text-[11px] text-stone-600">{company.visualNote}</p>
            </div>
          </div>
        </section>

        {/* At a glance */}
        <section className="bg-olive py-14 text-white">
          <dl className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l-4 border-copper pl-5">
                <dt className="font-label text-xs font-semibold tracking-[0.25em] text-white/60 uppercase">{fact.label}</dt>
                <dd className="mt-1 font-label text-lg font-semibold tracking-wide uppercase">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Why KM Developers */}
        <section className="bg-pattern py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="mb-12 text-center">
              <SectionHeading eyebrow="The KM" title="Promise" align="center" />
              <p className="mx-auto mt-4 max-w-2xl text-stone-600">{company.services.text}</p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {company.services.items.map((item) => {
                const Icon = SERVICE_ICONS[item.icon];
                return (
                  <div key={item.title} className="flex gap-4 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5">
                    <Icon className="size-8 shrink-0 text-copper" strokeWidth={1.6} aria-hidden />
                    <div>
                      <h3 className="font-label text-sm font-bold tracking-[0.12em] text-ink uppercase">{item.title}</h3>
                      <p className="mt-1 text-sm text-stone-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Project" title="Location" />
              <p className="mt-6 flex items-start gap-3 text-lg text-ink">
                <Building2 className="mt-1 size-5 shrink-0 text-copper" aria-hidden />
                {project.name}, {project.location}
              </p>
              <p className="mt-4 text-stone-600">
                {company.presence.markets.find((m) => m.name === project.market)?.text ??
                  "Part of our purposeful expansion into new opportunities across the region."}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
              <iframe
                title={`Map of ${project.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${project.location}, Maharashtra`)}&output=embed`}
                className="h-80 w-full lg:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <CtaBanner
          title={`Interested in ${project.name}?`}
          text="Share your details and our team will reach out with everything you need to know."
          source={`Project CTA: ${project.name}`}
          image={project.image}
        />

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-pattern py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeading eyebrow="More" title="Projects" />
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300 pt-8 font-label text-sm font-semibold tracking-wide uppercase">
                <Link href={`/projects/${prev.slug}`} className="flex items-center gap-2 text-ink hover:text-copper">
                  <ArrowLeft className="size-4" aria-hidden /> {prev.name}
                </Link>
                <Link href={`/projects/${next.slug}`} className="flex items-center gap-2 text-ink hover:text-copper">
                  {next.name} <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
