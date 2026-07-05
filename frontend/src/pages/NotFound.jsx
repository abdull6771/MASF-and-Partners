import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import usePageMeta from "../lib/usePageMeta.js";
import { btnPrimary, container } from "../lib/styles.js";

export default function NotFound() {
  usePageMeta("Page not found", "The page you were looking for could not be found.");

  return (
    <section className={`${container} flex flex-col items-start py-24 sm:py-32`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
        This page is off the grid.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
        The address may have changed or never existed. Head back to the homepage to find what you
        need.
      </p>
      <Link to="/" className={`${btnPrimary} mt-8`}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
