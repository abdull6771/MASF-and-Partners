import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to the numeric part of `value` (e.g. "30+", "14") the first
 * time it scrolls into view. Non-numeric values, reduced-motion users and
 * browsers without IntersectionObserver get the final value immediately.
 */
export default function AnimatedNumber({ value, duration = 1100 }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (target === null) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setDisplay(target);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();
        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  if (target === null) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
