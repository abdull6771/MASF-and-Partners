import { CatenaryLines, CircuitGrid, DotGrid, TopoLines } from "./Motifs.jsx";
import { container, eyebrowDark } from "../lib/styles.js";

const MOTIFS = {
  topo: TopoLines,
  circuit: CircuitGrid,
  catenary: CatenaryLines,
};

/**
 * Dark gradient hero used by every inner page. Sits under the fixed header
 * (hence the large top padding). `stat` renders an oversized page-specific
 * figure on the right at lg+ so each page opens with its own signature.
 */
export default function PageHero({ eyebrow, title, lede, motif = "topo", stat, children }) {
  const Motif = MOTIFS[motif] ?? TopoLines;
  return (
    <section className="on-dark relative overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-sea-900">
      <DotGrid className="absolute inset-0 h-full w-full text-white/[0.06]" id={`pagehero-dots-${motif}`} />
      {motif === "catenary" ? (
        <Motif className="pointer-events-none absolute inset-x-0 bottom-6 h-40 w-full text-brand-300/25" />
      ) : (
        <Motif className="pointer-events-none absolute -right-16 -top-16 h-[30rem] w-[30rem] text-brand-300/25" />
      )}
      <div className={`${container} relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36`}>
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            {eyebrow && (
              <p className={`rise-in ${eyebrowDark}`}>{eyebrow}</p>
            )}
            <h1
              className="rise-in mt-3 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
              style={{ animationDelay: "90ms" }}
            >
              {title}
            </h1>
            {lede && (
              <p
                className="rise-in mt-5 max-w-2xl text-base leading-relaxed text-brand-100/85 sm:text-lg"
                style={{ animationDelay: "180ms" }}
              >
                {lede}
              </p>
            )}
            {children}
          </div>
          {stat && (
            <div className="rise-in hidden pb-1 text-right lg:block" style={{ animationDelay: "260ms" }}>
              <p className="font-display text-6xl font-bold tracking-tight text-brand-300">{stat.value}</p>
              <p className="ml-auto mt-2 max-w-[13rem] text-sm leading-snug text-brand-100/75">{stat.label}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
