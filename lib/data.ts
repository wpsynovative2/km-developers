import companyData from "@/data/company.json";
import projectsData from "@/data/projects.json";

export type ProjectStatus = "ongoing" | "completed";

export interface Project {
  slug: string;
  name: string;
  developer?: string;
  location: string;
  market: string;
  status: ProjectStatus;
  featured: boolean;
  image: string;
  description: string[];
}

export const company = companyData;
export const projects = projectsData as Project[];

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, count = 3) {
  const sameMarket = projects.filter(
    (p) => p.slug !== project.slug && p.market === project.market,
  );
  const sameStatus = sameMarket.filter((p) => p.status === project.status);
  const rest = sameMarket.filter((p) => p.status !== project.status);
  return [...sameStatus, ...rest].slice(0, count);
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string, text?: string) {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${number.replace(/\D/g, "")}${query}`;
}
