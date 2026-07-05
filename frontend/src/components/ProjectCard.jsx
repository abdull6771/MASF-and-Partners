import { MapPin } from "lucide-react";
import { card } from "../lib/styles.js";

// Neutral badge with a category-coded dot keeps the palette disciplined.
const CATEGORY_DOTS = {
  "Power & Energy": "bg-amber-500",
  "ICT & Telecommunications": "bg-sky-500",
  "Safety & Security": "bg-emerald-500",
};

export default function ProjectCard({ project }) {
  return (
    <article className={`${card} flex h-full flex-col`}>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOTS[project.category] ?? "bg-brand-500"}`}
          />
          {project.category}
        </span>
        <span className="text-sm font-semibold text-slate-500">{project.year}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-brand-950">{project.title}</h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden="true" />
        {project.location}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tags?.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
