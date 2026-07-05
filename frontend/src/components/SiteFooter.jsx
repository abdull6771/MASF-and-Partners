import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import BrandMark from "./BrandMark.jsx";
import { TopoLines } from "./Motifs.jsx";
import { company, pillars } from "../data/content.js";
import { container } from "../lib/styles.js";

const QUICK_LINKS = [
  { to: "/about", label: "About us" },
  { to: "/projects", label: "Projects" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/compliance", label: "Compliance & certifications" },
  { to: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-brand-950 text-brand-100">
      <TopoLines className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] text-white/5" />
      <div className={`${container} relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16`}>
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10" />
            <div className="leading-tight">
              <p className="font-display text-base font-bold text-white">MASF &amp; Partners</p>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-brand-300">
                Limited · {company.rc}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-100/80">
            Environmental &amp; engineering consultancy delivering measurable advantage from Abuja
            since 2013.
          </p>
          <p className="mt-4 font-display text-sm font-semibold text-amber-300">
            “{company.tagline}”
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="rounded-sm text-brand-100/90 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={company.profilePdf}
                download
                className="rounded-sm text-brand-100/90 transition hover:text-white"
              >
                Company profile (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {pillars.map((pillar) => (
              <li key={pillar.id}>
                <Link
                  to={`/services#${pillar.id}`}
                  className="rounded-sm text-brand-100/90 transition hover:text-white"
                >
                  {pillar.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-brand-100/90">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <span>
                {company.address.suite}, {company.address.line2}, {company.address.city},{" "}
                {company.address.country}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {company.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="rounded-sm transition hover:text-white">
                    {phone.display}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="break-all rounded-sm transition hover:text-white">
                {company.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex gap-3" aria-label="Social media">
            {company.social.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-brand-100 transition hover:border-amber-300 hover:text-amber-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div
          className={`${container} flex flex-col gap-2 py-5 text-xs text-brand-100/70 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>
            © {new Date().getFullYear()} {company.name} · {company.rc} · All rights reserved.
          </p>
          <p>
            {company.address.line2}, {company.address.city}, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
