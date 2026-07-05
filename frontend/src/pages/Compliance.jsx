import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  Download,
  FileText,
} from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { company, credentials } from "../data/content.js";
import usePageMeta from "../lib/usePageMeta.js";
import { btnAccent, btnGhostDark, card, container } from "../lib/styles.js";

const CORPORATE_FACTS = [
  { icon: FileText, label: "CAC registration", value: company.rc },
  { icon: CalendarDays, label: "Incorporated", value: company.incorporated },
  { icon: Building2, label: "Registered office", value: "Suite B21, Business Plaza, Wuse II, Abuja" },
  { icon: Banknote, label: "Banker", value: company.banker },
];

export default function Compliance() {
  usePageMeta(
    "Compliance & Certifications",
    "Tender-ready documentation: CAC incorporation, FIRS tax clearance, NSITF, PENCOM, ITF, BPP registration, NEMSA certification and COREN-registered leadership — current and verifiable."
  );

  const dossierMailto = `mailto:${company.email}?subject=${encodeURIComponent(
    "Compliance dossier request — MASF & Partners Limited"
  )}&body=${encodeURIComponent(
    "Hello MASF & Partners,\n\nPlease share your current compliance dossier for tender evaluation.\n\nOrganisation:\nTender reference (if any):\n\nThank you."
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Compliance & certifications"
        title="Every document a tender board asks for. Current."
        lede="Procurement teams should not have to chase paperwork. MASF & Partners maintains each statutory registration and clearance required for Nigerian public and corporate procurement — consistent, current and verifiable on request."
        motif="topo"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className={container}>
          <SectionHeading
            eyebrow="The credentials"
            title="Eight trust signals, zero gaps"
            lede="Validity dates are stated as issued. Certified true copies accompany every bid submission."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {credentials.map((credential, index) => (
              <Reveal as="li" key={credential.name} delay={(index % 4) * 60} className="h-full">
                <div className={`${card} flex h-full flex-col`}>
                  <BadgeCheck className="h-7 w-7 text-brand-500" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-base font-bold leading-snug text-brand-950">
                    {credential.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm text-slate-600">{credential.issuer}</p>
                  <p className="mt-4 inline-flex self-start rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800 ring-1 ring-brand-200">
                    {credential.status}
                  </p>
                  {credential.image && (
                    <a
                      href={credential.image}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 self-start rounded-sm text-xs font-semibold text-brand-700 transition hover:text-brand-900"
                    >
                      View certificate scan
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <SectionHeading
            eyebrow="Corporate particulars"
            title="The facts evaluation committees verify first"
            lede="Registration, incorporation, registered office and banking reference — stated here exactly as they appear in our statutory records."
          />
          <Reveal delay={100}>
            <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
              {CORPORATE_FACTS.map((fact) => (
                <li key={fact.label} className="flex items-start gap-4 py-4">
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
          </Reveal>
        </div>
      </section>

      <section className={`${container} py-16 sm:py-20 lg:py-24`}>
        <Reveal className="on-dark relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-900 via-brand-950 to-sea-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Evaluating us for a tender?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-100/85 sm:text-lg">
              Request the full compliance dossier — certified copies of every document on this page,
              assembled for your evaluation file.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={company.profilePdf} download className={btnAccent}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Company profile (PDF)
              </a>
              <a href={dossierMailto} className={btnGhostDark}>
                Request certified copies
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to="/contact" className={btnGhostDark}>
                Contact the team
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
