import { MapPin } from "lucide-react";
import { card } from "../lib/styles.js";

const CATEGORY_STYLES = {
  "Power & Energy": "bg-amber-100 text-amber-900",
  "ICT & Telecommunications": "bg-sky-100 text-sky-900",
  "Safety & Security": "bg-emerald-100 text-emerald-900",
};

export default function ProjectCard({ project }) {
  return (
    <article className={`${card} flex h-full flex-col`}>
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            CATEGORY_STYLES[project.category] ?? "bg-slate-100 text-slate-700"
          }`}
        >
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
        {project.value && (
          <span className="rounded-full bg-brand-800 px-3 py-1 text-xs font-bold text-white">
            {project.value}
          </span>
        )}
        {project.tags?.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
