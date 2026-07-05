import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certStrip } from "../data/content.js";
import { container } from "../lib/styles.js";

function Pill({ cert, hidden = false }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-800 ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      <BadgeCheck className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
      {cert}
    </li>
  );
}

/**
 * Registrations ticker. Scrolls continuously (paused on hover); under
 * prefers-reduced-motion it falls back to a static wrapped row and the
 * duplicate loop copy is hidden.
 */
export default function CertStrip() {
  return (
    <section aria-label="Registrations and certifications" className="border-y border-slate-200 bg-brand-50/60">
      <div className={`${container} flex flex-col items-start gap-4 py-7 lg:flex-row lg:items-center`}>
        <div className="relative w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:[mask-image:none]">
          <ul className="flex w-max items-center gap-2.5 animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:animate-none">
            {certStrip.map((cert) => (
              <Pill key={cert} cert={cert} />
            ))}
            {/* Second copy makes the loop seamless; hidden for reduced motion. */}
            {certStrip.map((cert) => (
              <Pill key={`${cert}-loop`} cert={cert} hidden />
            ))}
          </ul>
        </div>
        <Link
          to="/compliance"
          className="inline-flex shrink-0 items-center gap-1 rounded-sm text-sm font-semibold text-brand-700 transition hover:text-brand-900"
        >
          All certifications, verified
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
