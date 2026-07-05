import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Satellite, Wind, Zap } from "lucide-react";
import CertStrip from "../components/CertStrip.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { CatenaryLines, CircuitGrid, DotGrid, TopoLines } from "../components/Motifs.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { company, equipment, pillars, projects, sectors, stats, testimonials } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { btnAccent, btnGhostDark, container } from "../lib/styles.js";

const HERO_TRUST = ["COREN-registered leadership", "NEMSA certified", "BPP registered"];

function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-sea-900">
      <DotGrid className="absolute inset-0 h-full w-full text-white/[0.05]" id="hero-dots" />
      <TopoLines className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] text-brand-400/10" />
      <CatenaryLines className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 w-full text-white/[0.07] lg:block" />

      <div className={`${container} relative grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28`}>
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
            Environmental &amp; Engineering Consultancy · Abuja, Nigeria
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Power delivered.
            <br />
            Environments protected.
            <br />
            <span className="text-brand-300">Systems connected.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
            MASF &amp; Partners delivers environmental assessment, power infrastructure, ICT networks
            and safety systems for government and industry — with the registrations, instruments and
            in-house team to stand behind every deliverable.
          </p>
          <p className="mt-5 font-display text-lg font-semibold text-amber-300">
            “{company.tagline}”
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className={btnAccent}>
              Request a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/projects" className={btnGhostDark}>
              View Our Projects
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {HERO_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-brand-200">
                <CheckCircle2 className="h-4 w-4 text-brand-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <CircuitGrid className="absolute -right-14 -top-14 h-64 w-64 text-brand-300/15" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              One firm, four disciplines
            </p>
            <ul className="relative mt-5 divide-y divide-white/10">
              {pillars.map((pillar) => (
                <li key={pillar.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-400/15 text-brand-300">
                    <pillar.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-white">{pillar.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-brand-100/70">{pillar.summary}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <span className="absolute -right-4 -top-4 inline-flex rotate-2 items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-brand-950 shadow-lg">
            <Zap className="h-3.5 w-3.5" /> 33KV energised
          </span>
          <span className="absolute -bottom-4 -left-4 inline-flex -rotate-2 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-brand-900 shadow-lg">
            <Wind className="h-3.5 w-3.5 text-brand-500" /> PM2.5 · field-measured
          </span>
          <span className="absolute -right-2 bottom-16 inline-flex items-center gap-1.5 rounded-full bg-sea-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
            <Satellite className="h-3.5 w-3.5 text-brand-300" /> VSAT online
          </span>
        </div>
      </div>
    </section>
  );
}

function StatBand() {
  return (
    <section aria-label="Company statistics" className="border-b border-slate-200 bg-white">
      <div className={`${container} grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4 lg:py-16`}>
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80} className="text-center lg:text-left">
            <p className="font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-semibold text-brand-950">{stat.label}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicePillars() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="What we do"
          title="Four disciplines, one accountable team"
          lede="Environmental science, power engineering, connectivity and protection — delivered by in-house specialists who answer for the whole scope."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delay={index * 80} className="h-full">
              <Link
                to={`/services#${pillar.id}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800 text-white transition group-hover:bg-brand-600">
                  <pillar.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-950">{pillar.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pillar.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {pillar.services.slice(0, 3).map((service) => (
                    <li key={service.name} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" aria-hidden="true" />
                      {service.name}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                  Explore services
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Track record"
            title="Projects that carry real load"
            lede="From a 7.4km 33KV line to military-grade broadband — selected work our team stands behind."
          />
          <Reveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-brand-700 transition hover:text-brand-900"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.title} delay={index * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesTeaser() {
  return (
    <section className="on-dark relative overflow-hidden bg-linear-to-br from-sea-900 via-brand-950 to-brand-900 py-16 sm:py-20 lg:py-24">
      <TopoLines className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] text-brand-300/10" />
      <div className={`${container} relative`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            dark
            eyebrow="In-house instrumentation"
            title="Many consultancies rent their instruments. We own ours."
            lede="Company-owned field equipment means faster mobilisation, a controlled chain of custody, and environmental data that stands up to regulatory scrutiny."
          />
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {equipment.slice(0, 6).map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-brand-300" aria-hidden="true" />
                  <span className="text-sm font-medium text-brand-100">{item.name}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/capabilities"
              className="mt-6 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-amber-300 transition hover:text-amber-200"
            >
              See the full instrument fleet
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="Who we serve"
          title="Trusted across five demanding sectors"
          lede="From federal ministries to hotel floors, our clients share one requirement: infrastructure that simply works."
          center
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((sector, index) => (
            <Reveal as="li" key={sector.name} delay={index * 60} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center">
                <sector.icon className="h-7 w-7 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 font-display text-sm font-bold text-brand-950">{sector.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{sector.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Renders only when real, attributable quotes exist in content.js. */
function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="What clients say"
          title="Trusted words from the people we serve"
          center
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.name} delay={index * 80} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <blockquote className="flex-1 text-base leading-relaxed text-slate-600">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-slate-100 pt-4">
                  <p className="font-display text-sm font-bold text-brand-950">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">
                    {[testimonial.role, testimonial.organization].filter(Boolean).join(", ")}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    null,
    "COREN-led environmental and engineering consultancy in Abuja — EIA studies, 33KV power infrastructure, ICT networks and safety systems since 2013. Let our services be your advantage."
  );

  return (
    <>
      <Hero />
      <StatBand />
      <ServicePillars />
      <FeaturedProjects />
      <CapabilitiesTeaser />
      <Sectors />
      <Testimonials />
      <CertStrip />
      <div className="h-16 sm:h-20" />
      <CtaBand />
    </>
  );
}
