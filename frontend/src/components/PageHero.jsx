import { CircuitGrid, DotGrid, TopoLines } from "./Motifs.jsx";
import { container, eyebrowDark } from "../lib/styles.js";

const MOTIFS = {
  topo: TopoLines,
  circuit: CircuitGrid,
};

/** Dark gradient hero used by every inner page. */
export default function PageHero({ eyebrow, title, lede, motif = "topo", children }) {
  const Motif = MOTIFS[motif] ?? TopoLines;
  return (
    <section className="on-dark relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-sea-900">
      <DotGrid className="absolute inset-0 h-full w-full text-white/[0.05]" id={`pagehero-dots-${motif}`} />
      <Motif className="pointer-events-none absolute -right-20 -top-24 h-[26rem] w-[26rem] text-brand-400/15" />
      <div className={`${container} relative py-16 sm:py-20 lg:py-24`}>
        {eyebrow && <p className={eyebrowDark}>{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {lede && <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100/85 sm:text-lg">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
