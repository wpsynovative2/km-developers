import { useId } from "react";

const CX = 100;
const CY = 64;
const R = 56;
const STEPS = 9;
// Pushes the two branches apart so wide numbers fit between them
const SPREAD = 26;

// Leaf positions along the left arc, from the bottom up to the top.
const LEAVES = Array.from({ length: STEPS }, (_, i) => {
  const deg = 102 + (i * 140) / (STEPS - 1);
  const rad = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad), deg, size: 1 - i * 0.045 };
});

function Branch() {
  return (
    <>
      <path
        d={`M ${CX + R * Math.cos((100 * Math.PI) / 180)} ${CY + R * Math.sin((100 * Math.PI) / 180)} A ${R} ${R} 0 0 1 ${CX + R * Math.cos((244 * Math.PI) / 180)} ${CY + R * Math.sin((244 * Math.PI) / 180)}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {LEAVES.map(({ x, y, deg, size }, i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${deg + 90}) scale(${size})`}>
          <ellipse cx="2" cy="-9" rx="4.2" ry="10" transform="rotate(-38)" />
          <ellipse cx="-2" cy="-9" rx="4.2" ry="10" transform="rotate(38)" />
        </g>
      ))}
    </>
  );
}

/** Copper laurel wreath framing a stat, as in the achievements band. */
export default function Laurel({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 132" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c286" />
          <stop offset="1" stopColor="#b8642a" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke="none" color="#d98b4b">
        <g transform={`translate(${-SPREAD} 0)`}>
          <Branch />
        </g>
        <g transform={`translate(${CX * 2 + SPREAD} 0) scale(-1 1)`}>
          <Branch />
        </g>
      </g>
    </svg>
  );
}
