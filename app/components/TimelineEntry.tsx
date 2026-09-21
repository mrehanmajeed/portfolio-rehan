import type { ReactNode } from "react";

/**
 * One item on the experience / education rail: a marker on a vertical line,
 * a title, a meta line, and body copy. `filled` marks the current position.
 */
export function TimelineEntry({
  title,
  meta,
  filled = false,
  className = "",
  children,
}: {
  title: string;
  meta: string;
  filled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-l border-black/20 pl-6 relative group hover:border-black transition-colors duration-500 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5 transition-all duration-500 ${
          filled
            ? "bg-ink group-hover:scale-150"
            : "bg-transparent border border-ink group-hover:bg-ink"
        }`}
      />
      <h3 className="text-xl md:text-2xl font-cormorant font-semibold text-ink">
        {title}
      </h3>
      <p className="text-[10px] uppercase tracking-widest text-black/50 mt-1 mb-4">
        {meta}
      </p>
      <div className="text-sm text-ink/80 leading-relaxed font-light">
        {children}
      </div>
    </div>
  );
}
