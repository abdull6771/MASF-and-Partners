import Reveal from "./Reveal.jsx";
import { eyebrow as eyebrowLight, eyebrowDark } from "../lib/styles.js";

/** Consistent section heading block: eyebrow, display title, optional lede. */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  center = false,
  as: Tag = "h2",
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className={dark ? eyebrowDark : eyebrowLight}>{eyebrow}</p>}
      <Tag
        className={`mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </Tag>
      {lede && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100/85" : "text-slate-600"}`}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
