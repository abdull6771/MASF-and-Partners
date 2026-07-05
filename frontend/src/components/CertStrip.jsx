import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { certStrip } from "../data/content.js";
import { container } from "../lib/styles.js";

/** Compact strip of regulatory registrations, linking to the compliance page. */
export default function CertStrip() {
  return (
    <section aria-label="Registrations and certifications" className="border-y border-slate-200 bg-brand-50/60">
      <Reveal
        className={`${container} flex flex-col items-start gap-4 py-8 lg:flex-row lg:items-center lg:justify-between`}
      >
        <ul className="flex flex-wrap items-center gap-2.5">
          {certStrip.map((cert) => (
            <li
              key={cert}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-800"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              {cert}
            </li>
          ))}
        </ul>
        <Link
          to="/compliance"
          className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm font-semibold text-brand-700 transition hover:text-brand-900"
        >
          All certifications, verified
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
