import { Award, CalendarDays, MapPin, Target, Telescope, Users } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { company, coreValues, mission, vision } from "../data/content.js";
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
          <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
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
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden="true" />
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

export default function About() {
  usePageMeta(
    "About",
    "Established 2013 in Abuja (RC 1161410): the story, vision, mission and values of MASF & Partners Limited."
  );

  return (
    <>
      <PageHero
        eyebrow="About MASF & Partners"
        title="Two disciplines. One accountable firm."
        lede="Environmental science and hard engineering rarely live under one roof. Since 2013, that combination has been our advantage — and our clients'."
        motif="topo"
        stat={{ value: "2013", label: "Established in Abuja · RC 1161410" }}
      />
      <Story />
      <VisionMissionValues />
      <CtaBand />
    </>
  );
}
