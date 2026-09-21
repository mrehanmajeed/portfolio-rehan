"use client";

import type { Project } from "../data/profile";

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center min-h-10 px-3 py-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap border border-current/15 transition-all duration-300 hover:border-current/50 hover:-translate-y-px"
    >
      {label} ↗
    </a>
  );
}

/**
 * A single project. `featured` renders the large dark card, `archive` the
 * compact light one — the two tiers share the same content model and action
 * row, so a new project only needs a data entry.
 */
export function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: Project;
  index: number;
  onOpenCaseStudy: () => void;
}) {
  const isFeatured = project.tier === "featured";
  const alignLeft = index % 2 === 0;

  const surface = isFeatured
    ? `${index % 2 === 0 ? "bg-coal" : "bg-graphite"} text-cream md:w-[50vw] p-5 sm:p-6 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)]`
    : "bg-cream text-ink md:w-[45vw] p-5 sm:p-6 md:p-8 shadow-2xl border border-black/5";

  const side = alignLeft ? "md:mr-auto md:ml-12" : "md:ml-auto md:mr-12";
  const muted = isFeatured ? "text-cream/50" : "text-black/50";
  const divider = isFeatured ? "bg-cream/30" : "bg-black/10";

  return (
    <article
      id={`project-${project.slug}`}
      className={`relative z-20 w-full mx-auto md:mx-0 ${side} ${surface} rounded-sm min-w-0 hover:-translate-y-2 transition-transform duration-500 scroll-mt-24`}
    >
      <div className="flex items-start gap-4 sm:gap-5 md:gap-6 mb-6 md:mb-8 min-w-0">
        <div
          aria-hidden="true"
          className={`w-14 h-14 sm:w-16 sm:h-16 ${
            isFeatured ? "md:w-20 md:h-20" : ""
          } shrink-0 flex items-center justify-center rounded-md border ${
            isFeatured
              ? "border-cream/10 bg-black/40"
              : "border-black/10 bg-white/50"
          } font-cormorant text-xl md:text-2xl font-semibold tracking-tight ${muted}`}
        >
          {project.monogram}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2 mb-1">
            <span
              className={`text-[10px] md:text-xs pt-1 md:pt-1.5 font-medium shrink-0 ${muted}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-medium tracking-tight leading-[0.95] break-words min-w-0 ${
                isFeatured
                  ? "text-xl sm:text-2xl md:text-4xl"
                  : "text-xl sm:text-2xl md:text-3xl"
              }`}
            >
              {project.title}
            </h3>
          </div>
          <p
            className={`text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-widest mt-2 break-words ${muted}`}
          >
            {project.stack}
          </p>
        </div>
      </div>

      <div className={`w-8 h-px ${divider} mb-5 md:mb-6`} />

      <p
        className={`font-light leading-relaxed ${
          isFeatured ? "text-sm md:text-base text-cream/80" : "text-sm text-black/70"
        }`}
      >
        {project.summary}
      </p>

      <div
        className={`flex flex-wrap items-center gap-2 sm:gap-3 pt-4 mt-6 border-t ${
          isFeatured ? "border-cream/10" : "border-black/10"
        }`}
      >
        <button
          type="button"
          onClick={onOpenCaseStudy}
          aria-label={`Read the ${project.title} case study`}
          className="inline-flex items-center justify-center min-h-10 px-3 py-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all duration-300 hover:-translate-y-px"
        >
          Case Study
        </button>
        {project.liveDemo && (
          <ActionLink href={project.liveDemo} label="Live Demo" />
        )}
        {project.repo && (
          <ActionLink href={project.repo} label="GitHub" />
        )}
      </div>
    </article>
  );
}
