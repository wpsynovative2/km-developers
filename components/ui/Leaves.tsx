import Image from "next/image";

export interface LeafSpec {
  leaf: 2 | 3 | 4 | 5 | 6;
  className: string;
  size?: number;
  slow?: boolean;
}

/** Decorative floating leaves, as scattered across the design. */
export default function Leaves({ items }: { items: LeafSpec[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ leaf, className, size = 56, slow }, i) => (
        <Image
          key={i}
          src={`/images/leaf-${leaf}.png`}
          alt=""
          width={size}
          height={size}
          className={`absolute h-auto drop-shadow-md ${slow ? "animate-float-slow" : "animate-float"} ${className}`}
          style={{ width: size, animationDelay: `${i * -1.7}s` }}
        />
      ))}
    </div>
  );
}
