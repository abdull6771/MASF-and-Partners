import { Award, Building2, CalendarDays, HardHat, MapPin, Target, Telescope, Users } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import {
  company,
  coreValues,
  departments,
  expertPanel,
  leadership,
  mission,
  teamStrength,
  vision,
} from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { card, container, eyebrow } from "../lib/styles.js";

const FACTS = [
  { icon: CalendarDays, label: "Incorporated", value: "23 December 2013 (CAC)" },
  { icon: Award, label: "Registration", value: company.rc },
  { icon: MapPin, label: "Headquarters", value: "Wuse II, Abuja, FCT" },
  { icon: Users, label: "Team strength", value: "30+ specialists in Abuja" },
];

function Story() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.2fr_0.8fr]`}>
        <Reveal>
          <p className={eyebrow}>Our story</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
            Built in Abuja. Measured against the best.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              MASF &amp; Partners Limited was established in 2013 and incorporated with the Corporate
              Affairs Commission ({company.rc}) to bring two disciplines that usually sit in separate
              firms — environmental science and hard engineering — under one accountable roof.
            </p>
            <p>
              That combination is deliberate. The projects our clients undertake, from fuel depots to
              training barracks, need power, connectivity and security delivered <em>and</em> the
              environmental evidence to permit, finance and defend them. We field both: a
              fourteen-specialist environmental panel working alongside electrical, mechanical, civil
              and ICT engineers, supported by twelve field electricians and our own instrument fleet.
            </p>
            <p>
              Today we serve government ministries and agencies, industrial and commercial operators,
              hotels, hospitals and corporate offices — with every statutory registration a Nigerian
              procurement process demands, current and verifiable.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand-700">
              Company facts
            </h3>
            <ul className="mt-5 divide-y divide-slate-200">
              {FACTS.map((fact) => (
                <li key={fact.label} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                  <fact.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {fact.label}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-brand-950">{fact.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VisionMissionValues() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="Direction"
          title="Vision, mission and the values behind both"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className={`${card} h-full`}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-white">
                <Telescope className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-950">Our vision</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{vision}</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className={`${card} h-full`}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-white">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-brand-950">Our mission</h3>
              <ul className="mt-3 space-y-2.5">
                {mission.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-slate-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {coreValues.map((value, index) => (
            <Reveal key={value.name} delay={index * 80} className="h-full">
              <div className={`${card} h-full`}>
                <value.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 font-display text-base font-bold text-brand-950">{value.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function initialsOf(name) {
  return name
    .replace(/^(Engr\.|Alh\.|Mal\.|Arc\.|Bar\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Leadership() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="Leadership"
          title="A board that has built what it oversees"
          lede="Engineers, an architect and legal counsel — chaired by a COREN-registered electrical engineer with nearly two decades of delivery."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {leadership.map((person, index) => (
            <Reveal as="li" key={person.name} delay={index * 60} className="h-full">
              <div className={`${card} flex h-full flex-col`}>
                <span
                  aria-hidden="true"
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-sea-800 font-display text-lg font-bold text-white"
                >
                  {initialsOf(person.name)}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-brand-950">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-600">{person.role}</p>
                {person.credentials && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{person.credentials}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Organisation() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <SectionHeading
          eyebrow="How we are organised"
          title="A structure sized for delivery"
          lede="The Board sets direction; the Managing Director drives four departments that plan, engineer, account for and administer every engagement."
        />
        <Reveal className="mt-12">
          <div className="mx-auto max-w-md rounded-2xl border border-brand-200 bg-white p-5 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Board of Directors</p>
            <p className="mt-1.5 font-display text-lg font-bold text-brand-950">Managing Director</p>
            <p className="text-sm text-slate-500">Engr. Mukhtar Ado</p>
          </div>
          <div className="mx-auto mt-2 h-6 w-px bg-brand-300" aria-hidden="true" />
          <ul className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((department) => (
              <li key={department.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-800">
                  {department.name}
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {department.roles.map((role) => (
                    <li key={role} className="text-sm text-slate-600">
                      {role}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="font-display text-lg font-bold text-brand-950">Team strength — Abuja</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {teamStrength.map((item) => (
              <li
                key={item.role}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
              >
                <span className="font-display font-bold text-brand-700">{item.count}</span>
                {item.role}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="font-display text-lg font-bold text-brand-950">
            The environmental expert panel
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Fourteen specialists cover every discipline an impact assessment demands — convened per
            project under a single team leader.
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {expertPanel.map((role) => (
              <li
                key={role}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
              >
                <HardHat className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                {role}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function HsePolicy() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className={container}>
        <Reveal className="on-dark relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-900 via-brand-950 to-sea-900 px-6 py-12 sm:px-12 sm:py-14">
          <Building2 className="absolute -right-8 -top-8 h-48 w-48 text-white/5" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              HSE &amp; quality policy
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              One integrated management approach — quality, environment, and health &amp; safety
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-100/85">
              MASF &amp; Partners runs an integrated management approach aligning quality (QMS),
              environmental (EMS) and occupational health &amp; safety (OHS) systems across every
              engagement. Site work is planned around hazard identification and risk assessment before
              mobilisation; environmental monitoring uses calibrated, company-owned instrumentation;
              and every deliverable passes a structured quality-assurance review before release.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Plan: hazards assessed before mobilisation", "Measure: calibrated, owned instruments", "Assure: structured QA on every deliverable"].map(
                (item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-brand-100"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  usePageMeta(
    "About",
    "Established 2013 in Abuja (RC 1161410): the story, leadership board, organisational structure and integrated HSE & quality policy of MASF & Partners Limited."
  );

  return (
    <>
      <PageHero
        eyebrow="About MASF & Partners"
        title="Two disciplines. One accountable firm."
        lede="Environmental science and hard engineering rarely live under one roof. Since 2013, that combination has been our advantage — and our clients'."
        motif="topo"
      />
      <Story />
      <VisionMissionValues />
      <Leadership />
      <Organisation />
      <HsePolicy />
      <CtaBand />
    </>
  );
}
