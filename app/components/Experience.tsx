import { education, experience } from "../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TimelineEntry } from "./TimelineEntry";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full bg-sand py-20 md:py-32 px-6 md:px-20 border-b border-black/10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <div>
          <SectionHeading
            number="02"
            title="Experience"
            className="mb-8 md:mb-12"
          />

          {experience.map((role) => (
            <TimelineEntry
              key={`${role.company}-${role.period}`}
              title={role.title}
              meta={`${role.company} • ${role.period}`}
              filled={role.mostRecent}
              className="mb-10 md:mb-12 last:mb-0"
            >
              <p>{role.summary}</p>
            </TimelineEntry>
          ))}
        </div>

        <div>
          <SectionHeading
            number="03"
            title="Education"
            className="mb-8 md:mb-12"
          />
          <TimelineEntry
            title={education.degree}
            meta={`${education.institution} • ${education.period}`}
            filled
          >
            <p>{education.detail}</p>
            <p className="mt-6 font-medium text-ink">{education.grade}</p>
          </TimelineEntry>
        </div>
      </div>
    </section>
  );
}
