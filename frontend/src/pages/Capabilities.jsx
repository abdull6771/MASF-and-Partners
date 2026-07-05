import { FileCheck2, Gauge, LineChart, Truck } from "lucide-react";
import CtaBand from "../components/CtaBand.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { equipment } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { card, container } from "../lib/styles.js";

const WORKFLOW = [
  {
    icon: Truck,
    title: "Mobilise",
    detail: "Instruments are in-house, calibrated and ready — field teams deploy in days, not weeks.",
  },
  {
    icon: Gauge,
    title: "Measure",
    detail: "Air, water, noise, light, radiation and particulates captured on site, logged digitally.",
  },
  {
    icon: LineChart,
    title: "Analyse",
    detail: "Our fourteen-specialist panel interprets results against Nigerian and international limits.",
  },
  {
    icon: FileCheck2,
    title: "Report",
    detail: "Findings arrive as regulator-ready documentation with a defensible chain of custody.",
  },
];

export default function Capabilities() {
  usePageMeta(
    "Capabilities & Equipment",
    "MASF & Partners' company-owned instrument fleet: GrayWolf air quality meters, WHO/UNICEF-standard mobile water laboratory, UAV survey drone, BOD testing and RF/EMF analysis."
  );

  return (
    <>
      <PageHero
        eyebrow="Capabilities & equipment"
        title="Data you can defend starts with instruments we own"
        lede="Renting equipment means waiting, unknown calibration and gaps in the chain of custody. Our environmental practice runs on a company-owned fleet — mobilised at short notice for every study we sign."
        motif="circuit"
        stat={{ value: "7", label: "Instrument systems owned and calibrated in-house" }}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="The instrument fleet"
            title="Seven systems, one standard: measurable proof"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {equipment.map((item, index) => (
              <Reveal as="li" key={item.name} delay={(index % 3) * 70} className="h-full">
                <div className={`${card} flex h-full flex-col`}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold leading-snug text-brand-950">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.spec}</p>
                  <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-brand-800">
                    {item.benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="Field to report"
            title="How a MASF study runs"
            lede="A disciplined four-step workflow keeps every measurement traceable from the field notebook to the final signature."
            center
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 90} className="h-full">
                <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="absolute right-5 top-4 font-display text-4xl font-bold text-brand-100" aria-hidden="true">
                    {index + 1}
                  </span>
                  <step.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-base font-bold text-brand-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="h-16 sm:h-20" />
      <CtaBand
        title="Need monitoring you can take to a regulator?"
        lede="Tell us the parameters, the site and the deadline. We will scope the survey, mobilise the instruments and deliver documentation built for scrutiny."
      />
    </>
  );
}
