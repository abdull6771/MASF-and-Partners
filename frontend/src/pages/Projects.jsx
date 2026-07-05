import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { projectCategories, projects, projectsNote } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { container } from "../lib/styles.js";

const ALL = "All projects";

export default function Projects() {
  usePageMeta(
    "Projects",
    "Selected MASF & Partners track record: 33KV overhead lines, transformer substations, military broadband deployments and integrated hotel security systems."
  );

  const [filter, setFilter] = useState(ALL);
  const filters = [ALL, ...projectCategories];

  const visibleProjects = useMemo(
    () => (filter === ALL ? projects : projects.filter((project) => project.category === filter)),
    [filter]
  );

  return (
    <>
      <PageHero
        eyebrow="Track record"
        title="Work that carries real load"
        lede="High-voltage lines, aviation fuel depots, military broadband, hotel security — a portfolio built on scopes where failure is not an option."
        motif="topo"
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className={container}>
          <h2 className="sr-only">Project portfolio</h2>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2.5"
          >
            {filters.map((category) => {
              const active = filter === category;
              const count =
                category === ALL
                  ? projects.length
                  : projects.filter((project) => project.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-brand-800 bg-brand-800 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-800"
                  }`}
                >
                  {category}
                  <span
                    className={`rounded-full px-1.5 text-xs font-bold ${
                      active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
            {visibleProjects.map((project, index) => (
              <Reveal as="li" key={project.title} delay={(index % 3) * 60} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
            {projectsNote}
          </p>

          <Reveal className="mt-12">
            <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-200 bg-brand-50/70 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
              <p className="max-w-xl text-sm leading-relaxed text-brand-900">
                <strong className="font-display">Environmental engagements are instrumented in-house.</strong>{" "}
                Air, water, noise and EMF surveys run on our own calibrated equipment — see what we
                field on every study.
              </p>
              <Link
                to="/capabilities"
                className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm font-semibold text-brand-700 transition hover:text-brand-900"
              >
                Explore capabilities
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Planning a project like these?"
        lede="Send the outline — location, scope, timeline. We will respond with a delivery approach and the credentials your evaluation committee will ask for."
      />
    </>
  );
}
