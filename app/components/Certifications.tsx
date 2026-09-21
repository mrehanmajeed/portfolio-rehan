import { certificates } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full bg-sand py-20 md:py-32 px-6 md:px-20 border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="05"
          title="Certifications"
          className="mb-10 md:mb-16"
        />

        {/* gap-x keeps a left-column issuer from colliding with the right
            column's title; the row borders provide the horizontal rhythm. */}
        <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 border-t border-black/10">
          {certificates.map((certificate) => (
            <li
              key={certificate.title}
              className="flex items-baseline justify-between gap-6 py-5 md:py-6 border-b border-black/10 group"
            >
              <span className="font-cormorant text-lg md:text-2xl text-ink group-hover:translate-x-1 transition-transform duration-500">
                {certificate.title}
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-black/50 shrink-0">
                {certificate.issuer}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
