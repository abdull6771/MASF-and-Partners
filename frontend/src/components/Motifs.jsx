// Decorative SVG motifs — topography contours, circuitry, dot grids and
// power-line catenaries. All are aria-hidden and inherit currentColor so the
// parent controls hue and opacity via text-* utilities.

export function TopoLines({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M ${-40 - i * 8} ${240 + i * 22}
             C ${60 - i * 10} ${150 - i * 26}, ${170 + i * 12} ${330 - i * 30}, ${290 + i * 14} ${180 - i * 18}
             S ${430 + i * 10} ${60 - i * 12}, ${470 + i * 16} ${140 - i * 20}`}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

export function CircuitGrid({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 40h90l30 30v70M140 40h140M60 40v120l40 40h80M280 90v110l-40 40H120M180 140h100M180 140v80"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {[
        [20, 40],
        [140, 40],
        [280, 40],
        [140, 140],
        [280, 90],
        [180, 140],
        [280, 140],
        [180, 220],
        [120, 240],
        [240, 240],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="currentColor" />
      ))}
    </svg>
  );
}

export function DotGrid({ className = "", id = "dotgrid" }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Outline of the brand "M" monogram — used as a large section watermark. */
export function MonogramMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M14 46V18l18 17 18-17v28"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="35" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function CatenaryLines({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 200"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 40 Q150 110 300 40 T600 40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 70 Q150 140 300 70 T600 70" stroke="currentColor" strokeWidth="1.2" />
      <path d="M0 100 Q150 170 300 100 T600 100" stroke="currentColor" strokeWidth="1" />
      {[0, 300, 600].map((x) => (
        <g key={x} stroke="currentColor" strokeWidth="1.5">
          <line x1={x} y1="20" x2={x} y2="120" />
          <circle cx={x} cy="40" r="3" fill="currentColor" stroke="none" />
          <circle cx={x} cy="70" r="3" fill="currentColor" stroke="none" />
          <circle cx={x} cy="100" r="3" fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}
