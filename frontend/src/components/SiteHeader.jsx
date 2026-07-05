import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark.jsx";
import { container } from "../lib/styles.js";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/compliance", label: "Compliance" },
  { to: "/contact", label: "Contact" },
];

function navLinkClass({ isActive }) {
  return [
    "rounded-md px-2.5 py-2 text-sm font-medium transition",
    isActive
      ? "font-semibold text-brand-800 underline decoration-amber-400 decoration-2 underline-offset-8"
      : "text-slate-600 hover:text-brand-800",
  ].join(" ");
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Focus trap + Escape + scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    panel?.querySelector("a, button")?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      (previouslyFocused ?? toggleRef.current)?.focus?.();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className={`${container} flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]`}>
        <Link to="/" className="flex items-center gap-3 rounded-md" aria-label="MASF & Partners Limited — home">
          <BrandMark className="h-9 w-9 shrink-0 lg:h-10 lg:w-10" />
          <span className="leading-tight">
            <span className="block font-display text-[0.95rem] font-bold tracking-tight text-brand-950 lg:text-base">
              MASF &amp; Partners
            </span>
            <span className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-slate-500">
              Environmental &amp; Engineering
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden items-center rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 xl:inline-flex"
          >
            Request a Consultation
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brand-900 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="on-dark fixed inset-0 z-50 flex flex-col bg-brand-950 lg:hidden"
        >
          <div className={`${container} flex h-16 items-center justify-between`}>
            <span className="flex items-center gap-3">
              <BrandMark className="h-9 w-9" />
              <span className="font-display text-base font-bold text-white">MASF &amp; Partners</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Primary mobile" className={`${container} mt-6 flex flex-1 flex-col`}>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      [
                        "block rounded-lg px-4 py-3 font-display text-2xl font-semibold transition",
                        isActive ? "bg-white/10 text-amber-300" : "text-white hover:bg-white/5",
                      ].join(" ")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-8 mb-10 inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3.5 text-base font-semibold text-brand-950"
            >
              Request a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
