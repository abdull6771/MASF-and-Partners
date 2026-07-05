import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { CatenaryLines, MonogramMark } from "./Motifs.jsx";
import { btnAccent, btnGhostDark, container } from "../lib/styles.js";

/** Closing call-to-action band, shared across pages. */
export default function CtaBand({
  title = "Have a project or tender in view?",
  lede = "Tell us what you are planning. We will respond with a clear scope, a realistic programme and the compliance documentation your procurement process requires.",
}) {
  return (
    <section className={`${container} pb-16 sm:pb-20 lg:pb-24`}>
      <Reveal className="on-dark relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-900 via-brand-950 to-sea-900 px-6 py-12 sm:px-12 sm:py-16">
        <CatenaryLines className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-white/10" />
        <MonogramMark className="pointer-events-none absolute -right-10 -top-16 hidden h-80 w-80 rotate-6 text-white/[0.06] lg:block" />
        <div className="relative max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-brand-100/85 sm:text-lg">{lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className={btnAccent}>
              Request a consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/compliance" className={btnGhostDark}>
              View our credentials
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
