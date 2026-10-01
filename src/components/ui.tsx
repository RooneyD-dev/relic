import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

/** Four-part RELIC mark: three quiet planes and one cut stone. */
export function BrandMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="0" y="0" width="10" height="10" fill="currentColor" />
      <rect x="14" y="0" width="10" height="10" fill="currentColor" opacity="0.5" />
      <rect x="0" y="14" width="10" height="10" fill="currentColor" opacity="0.5" />
      <rect
        x="16.5"
        y="16.5"
        width="6"
        height="6"
        transform="rotate(45 19.5 19.5)"
        fill="var(--color-mineral)"
      />
    </svg>
  );
}

/** Fixed film grain. One layer, no layout cost. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-overlay"
    />
  );
}

/** Mono section label, e.g. `01 — Discover`. */
export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-mineral" />
      <span>{children}</span>
    </p>
  );
}

/**
 * One-time scroll reveal with a visible-content fallback: no observer support,
 * or a reduced-motion preference, renders children immediately.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canObserve = typeof window !== "undefined" && "IntersectionObserver" in window;

  if (reduce || !canObserve) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Solid pill button used for primary actions. */
export function SolidButton({
  children,
  className = "",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={`group inline-flex min-h-11 items-center justify-center gap-2.5 bg-chalk px-6 py-3.5 label text-ink transition-colors duration-200 hover:bg-mineral focus-visible:outline-offset-4 ${className}`}
    >
      {children}
    </a>
  );
}
