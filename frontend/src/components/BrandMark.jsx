/** The MASF monogram — teal-to-blue gradient tile with an "M" strokes mark. */
export default function BrandMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="brandmark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15776d" />
          <stop offset="1" stopColor="#16405c" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#brandmark-g)" />
      <path
        d="M14 46V18l18 17 18-17v28"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="35" r="3.5" fill="#fbbf24" />
    </svg>
  );
}
