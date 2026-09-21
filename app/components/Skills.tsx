import { skillGroups } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full bg-cream py-20 md:py-32 px-6 md:px-20 border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="04"
          title="Technical Expertise"
          className="mb-10 md:mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-t border-black/10 pt-10 md:pt-12">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-4 md:mb-6 text-ink">
                {group.title}
              </h3>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-black/70 font-light">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
