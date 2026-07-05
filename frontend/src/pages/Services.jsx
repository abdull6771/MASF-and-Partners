import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { pillars } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { container, eyebrow } from "../lib/styles.js";

/** One expandable service row (accessible accordion item). */
function ServiceRow({ pillarId, service, index, open, onToggle }) {
  const buttonId = `${pillarId}-service-${index}`;
  const panelId = `${pillarId}-panel-${index}`;
  return (
    <li className="border-b border-slate-200 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-md px-1 py-4 text-left transition hover:text-brand-700"
        >
          <span className="text-base font-semibold text-brand-950">{service.name}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand-500 transition-transform motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-1 pb-5"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{service.detail}</p>
      </div>
    </li>
  );
}

function PillarSection({ pillar, indexOffset }) {
  const alternate = indexOffset % 2 === 1;
  const [openItems, setOpenItems] = useState(() => new Set());

  function toggle(index) {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      id={pillar.id}
      aria-labelledby={`${pillar.id}-heading`}
      className={`scroll-mt-24 border-b border-slate-200 py-14 last:border-b-0 sm:py-16 ${
        alternate ? "bg-slate-50/70" : "bg-white"
      }`}
    >
      <div className={`${container} grid gap-10 lg:grid-cols-[0.9fr_1.1fr]`}>
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-white">
              <pillar.icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className={`mt-5 ${eyebrow}`}>
              Pillar {String(indexOffset + 1).padStart(2, "0")} · {pillar.services.length} services
            </p>
            <h2
              id={`${pillar.id}-heading`}
              className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl"
            >
              {pillar.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">{pillar.intro}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-brand-700 transition hover:text-brand-900"
            >
              Discuss your {pillar.title} brief
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ul className="rounded-2xl border border-slate-200 bg-white px-5 shadow-sm sm:px-7">
            {pillar.services.map((service, index) => (
              <ServiceRow
                key={service.name}
                pillarId={pillar.id}
                service={service}
                index={index}
                open={openItems.has(index)}
                onToggle={() => toggle(index)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function Services() {
  usePageMeta(
    "Services",
    "Environmental consultancy, electrical & mechanical engineering, ICT & telecommunications, and safety & security — twenty services across four pillars, delivered in-house."
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four pillars. Twenty ways to put them to work."
        lede="Every service below is delivered by our own engineers, technologists and environmental specialists — one firm accountable for the whole scope."
        motif="circuit"
        stat={{ value: "20", label: "Specialist services across four pillars" }}
      >
        <nav aria-label="Service pillars" className="rise-in mt-8 flex flex-wrap gap-2.5" style={{ animationDelay: "260ms" }}>
          {pillars.map((pillar) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-brand-100 transition hover:border-amber-300 hover:text-amber-300"
            >
              <pillar.icon className="h-4 w-4" aria-hidden="true" />
              {pillar.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {pillars.map((pillar, index) => (
        <PillarSection key={pillar.id} pillar={pillar} indexOffset={index} />
      ))}

      <div className="h-16 sm:h-20" />
      <CtaBand
        title="Not sure which service fits your brief?"
        lede="Describe the outcome you need — compliance sign-off, stable power, dependable connectivity or a secure site — and we will map the scope with you."
      />
    </>
  );
}
