/**
 * The numbered eyebrow that opens every section ("01. Philosophy").
 * `invert` switches it for use on the dark panels.
 */
export function SectionHeading({
  number,
  title,
  invert = false,
  className = "mb-6 md:mb-8",
}: {
  number: string;
  title: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-[10px] uppercase tracking-[0.2em] font-bold ${
        invert ? "text-cream/40" : "text-black/40"
      } ${className}`}
    >
      {number}. {title}
    </h2>
  );
}
