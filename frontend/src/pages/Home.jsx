import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Satellite, Wind, Zap } from "lucide-react";
import AnimatedNumber from "../components/AnimatedNumber.jsx";
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

const FEATURE_CHIPS = ["GrayWolf multi-gas", "PM0.5–PM10 counters", "Mobile water lab", "UAV survey"];

function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-sea-900">
      <DotGrid className="absolute inset-0 h-full w-full text-white/[0.05]" id="hero-dots" />
      <TopoLines className="pointer-events-none absolute -left-32 bottom-0 h-[30rem] w-[30rem] text-brand-400/10" />
      <CatenaryLines className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 w-full text-white/[0.07] lg:block" />

      <div className={`${container} relative pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-36`}>
        <p className="rise-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
          Environmental &amp; Engineering Consultancy · Abuja, Nigeria
        </p>
        <h1
          className="rise-in mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ animationDelay: "90ms" }}
        >
          <span className="block">Power delivered.</span>
          <span className="block">Environments protected.</span>
          <span className="block text-brand-300">Systems connected.</span>
        </h1>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p
              className="rise-in max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              MASF &amp; Partners delivers environmental assessment, power infrastructure, ICT
              networks and safety systems for government and industry — with the registrations,
              instruments and in-house team to stand behind every deliverable.
            </p>
            <p
              className="rise-in mt-5 font-display text-lg font-semibold text-amber-300"
              style={{ animationDelay: "250ms" }}
            >
              “{company.tagline}”
            </p>
            <div className="rise-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
              <Link to="/contact" className={btnAccent}>
                Request a Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/projects" className={btnGhostDark}>
                View Our Projects
              </Link>
            </div>
            <ul className="rise-in mt-10 flex flex-wrap gap-x-6 gap-y-2" style={{ animationDelay: "390ms" }}>
              {HERO_TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-brand-200">
                  <CheckCircle2 className="h-4 w-4 text-brand-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rise-in relative hidden lg:block" style={{ animationDelay: "460ms" }} aria-hidden="true">
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
            <span className="absolute -right-3 -top-4 inline-flex rotate-2 items-center gap-1.5 rounded-full bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-brand-950 shadow-lg">
              <Zap className="h-3.5 w-3.5" /> 33KV energised
            </span>
            <span className="absolute -bottom-4 -left-3 inline-flex -rotate-2 items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-brand-900 shadow-lg">
              <Wind className="h-3.5 w-3.5 text-brand-500" /> PM2.5 · field-measured
            </span>
            <span className="absolute -bottom-4 right-10 inline-flex rotate-1 items-center gap-1.5 rounded-full bg-sea-800 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg">
              <Satellite className="h-3.5 w-3.5 text-brand-300" /> VSAT online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Floating stat card overlapping the hero's bottom edge; numbers count up on reveal. */
function StatBand() {
  return (
    <section aria-label="Company statistics" className="relative z-10">
      <div className={container}>
        <Reveal className="-mt-12 grid grid-cols-2 gap-y-8 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-xl shadow-brand-950/10 sm:px-10 lg:-mt-16 lg:grid-cols-4 lg:py-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
                <AnimatedNumber value={stat.value} />
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-950">{stat.label}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const pillarCardClass =
  "group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0";

function PillarIcon({ icon: Icon }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-sea-800 text-white shadow-sm transition group-hover:from-brand-500 group-hover:to-sea-700">
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  );
}

/** Bento layout: environmental practice featured wide, a conversion tile closing the grid. */
function ServicePillars() {
  const [environmental, power, ict, safety] = pillars;
  return (
    <section className="bg-slate-50 pb-16 pt-14 sm:pb-20 lg:pb-24 lg:pt-20">
      <div className={container}>
        <SectionHeading
          eyebrow="What we do"
          title="Four disciplines, one accountable team"
          lede="Environmental science, power engineering, connectivity and protection — delivered by in-house specialists who answer for the whole scope."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Reveal className="h-full lg:col-span-2">
            <Link to={`/services#${environmental.id}`} className={pillarCardClass}>
              <div className="grid flex-1 gap-8 sm:grid-cols-2">
                <div className="flex flex-col">
                  <PillarIcon icon={environmental.icon} />
                  <h3 className="mt-5 font-display text-xl font-bold text-brand-950">
                    {environmental.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {environmental.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                    Explore services
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-5 border-t border-slate-100 pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <ul className="space-y-2">
                    {environmental.services.slice(0, 4).map((service) => (
                      <li key={service.name} className="flex items-start gap-1.5 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                        {service.name}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                      Measured with our own fleet
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {FEATURE_CHIPS.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={80} className="h-full">
            <Link to={`/services#${power.id}`} className={pillarCardClass}>
              <PillarIcon icon={power.icon} />
              <h3 className="mt-5 font-display text-lg font-bold text-brand-950">{power.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{power.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                Explore services
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>

          {[ict, safety].map((pillar, index) => (
            <Reveal key={pillar.id} delay={140 + index * 60} className="h-full">
              <Link to={`/services#${pillar.id}`} className={pillarCardClass}>
                <PillarIcon icon={pillar.icon} />
                <h3 className="mt-5 font-display text-lg font-bold text-brand-950">{pillar.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pillar.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                  Explore services
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={260} className="h-full">
            <Link
              to="/contact"
              className="on-dark group flex h-full flex-col justify-between rounded-2xl bg-linear-to-br from-brand-800 to-sea-900 p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-white">Not sure where to start?</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-100/80">
                  Tell us the outcome you need — compliance sign-off, stable power, dependable
                  connectivity or a secure site — and we will map the scope with you.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-amber-300 transition group-hover:text-amber-200">
                Talk to us
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
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
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
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
      <div className="h-14 sm:h-16" />
      <CtaBand />
    </>
  );
}
