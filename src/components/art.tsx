/* Decorative SVG artwork — fine line art in the site's ink colour
   (inherits currentColor), with amber accents. Stands in for product
   photography until real photos exist. */

const amber = "#c68a2a";

export function SidrSprig() {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M20 104C44 84 74 52 100 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M46 82c-16-4-26 2-30 10 12 4 24 0 30-10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M62 64c-14-8-26-4-32 2 10 8 24 6 32-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M78 46c-10-10-24-10-30-6 8 10 20 12 30 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M92 30c-6-12-18-14-26-12 4 12 16 16 26 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="30" cy="62" r="6" stroke={amber} strokeWidth="2" />
      <circle cx="48" cy="42" r="5" stroke={amber} strokeWidth="2" />
    </svg>
  );
}

export function BlackSeeds() {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M38 78c-8-14-2-30 10-36 8 12 6 30-10 36Z" stroke="currentColor" strokeWidth="2" />
      <path d="M64 88c-10-12-8-30 4-38 10 10 10 28-4 38Z" stroke="currentColor" strokeWidth="2" />
      <path d="M88 74c-12-8-14-24-6-34 12 6 16 22 6 34Z" stroke="currentColor" strokeWidth="2" />
      <path d="M43 60l4 12M67 62l2 16M85 52l-2 14" stroke={amber} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Dates() {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M60 22c-2 10-8 16-16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="46" cy="70" rx="16" ry="26" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="76" cy="76" rx="15" ry="24" stroke="currentColor" strokeWidth="2" />
      <path d="M46 52v36M76 60v32" stroke={amber} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Dipper() {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M84 20 40 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 56c-8 8-8 18-2 24s16 6 24-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 62c14 12 18 14 34-2M28 70c10 8 14 8 24-2M34 78c6 4 10 4 16-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 96c0 5-3.5 9-8 9s-8-4-8-9 8-16 8-16 8 11 8 16Z" stroke={amber} strokeWidth="2" fill="rgba(198,138,42,.2)" />
    </svg>
  );
}

/* Product jar — colours vary per collection card. Gradient ids are derived
   from the colours so multiple jars on one page never collide. */
export function Jar({
  honeyTop = "#e9a83b",
  honeyBottom = "#b3730f",
  label = "#f2e8d2",
}: {
  honeyTop?: string;
  honeyBottom?: string;
  label?: string;
}) {
  const gid = `jar-${honeyTop.replace("#", "")}-${honeyBottom.replace("#", "")}`;
  return (
    <svg viewBox="0 0 200 250" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={honeyTop} />
          <stop offset="1" stopColor={honeyBottom} />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="56" y="26" width="88" height="26" rx="9" fill="#2b1c0d" />
      <rect x="56" y="26" width="88" height="10" rx="5" fill="#43301a" />
      {/* neck ring */}
      <rect x="62" y="52" width="76" height="8" rx="4" fill="#8a6a3f" opacity="0.6" />
      {/* glass body */}
      <path
        d="M58 66c-10 10-16 24-16 42v76c0 28 26 44 58 44s58-16 58-44v-76c0-18-6-32-16-42H58Z"
        fill={`url(#${gid})`}
      />
      {/* meniscus */}
      <ellipse cx="100" cy="70" rx="46" ry="8" fill="#ffffff" opacity="0.18" />
      {/* glass highlight */}
      <path
        d="M60 82c-6 8-9 18-9 28v66c0 10 4 18 10 24"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* label */}
      <rect x="48" y="128" width="104" height="62" rx="8" fill={label} />
      <path d="M100 138l11 6.5v13l-11 6.5-11-6.5v-13l11-6.5Z" stroke="#2b1c0d" strokeWidth="2.4" />
      <path d="M68 174h64" stroke="#2b1c0d" strokeOpacity="0.65" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M80 182h40" stroke="#2b1c0d" strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/* Small icons for the promise rows */
export function PromiseIcon({ name }: { name: string }) {
  const common = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  switch (name) {
    case "ship":
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
          <path d="M8 30h32l-4 8H12l-4-8Z" {...common} />
          <path d="M14 30V16h20v14M24 16V9M19 9h10" {...common} />
          <path d="M6 42c3 2 5 2 8 0s5-2 8 0 5 2 8 0 5-2 8 0" {...common} />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
          <path d="M6 38 20 14l8 14 6-8 8 18H6Z" {...common} />
          <circle cx="36" cy="12" r="4" {...common} />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
          <path d="M24 6 8 12v12c0 10 7 16 16 20 9-4 16-10 16-20V12L24 6Z" {...common} />
          <path d="m17 24 5 5 9-10" {...common} />
        </svg>
      );
    case "drop":
    default:
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
          <path d="M24 6s-13 14-13 24a13 13 0 0 0 26 0C37 20 24 6 24 6Z" {...common} />
          <path d="M18 30a6 6 0 0 0 6 6" {...common} />
        </svg>
      );
  }
}
