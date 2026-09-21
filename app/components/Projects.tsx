"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { archiveProjects, featuredProjects, type Project } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";

type Tier = "featured" | "archive";

const TITLES: Record<Tier, [string, string]> = {
  featured: ["Selected", "Work."],
  archive: ["Archived", "Projects."],
};

/** The oversized heading pinned behind the cards, swapped as each tier scrolls in. */
function StickyTitle({ tier }: { tier: Tier }) {
  return (
    <div key={tier} className="absolute flex flex-col items-center">
      {TITLES[tier].map((line, i) => (
        <div key={line} className="overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.85, 0, 0.15, 1],
              delay: i * 0.05,
            }}
            className="block font-cormorant text-4xl md:text-[6.5vw] font-bold tracking-tighter uppercase leading-none text-center"
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  const [activeTier, setActiveTier] = useState<Tier>("featured");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div id="work" className="relative w-full bg-cream border-b border-black/10">
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <div
        aria-hidden="true"
        className={`sticky top-0 h-screen w-full pointer-events-none flex items-center justify-center p-6 mix-blend-difference text-white ${
          activeTier === "featured" ? "z-40" : "z-0"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            <StickyTitle key={activeTier} tier={activeTier} />
          </AnimatePresence>
        </div>
      </div>

      {/* Headings for assistive tech and crawlers — the sticky display copy
          above is decorative. */}
      <h2 className="sr-only">Selected Work</h2>

      <div className="relative z-20 w-full -mt-[100vh] pt-[60vh] md:pt-[70vh] pb-[20vh]">
        <motion.div
          onViewportEnter={() => setActiveTier("featured")}
          viewport={{ margin: "-30% 0px -30% 0px" }}
          className="flex flex-col gap-12 sm:gap-16 md:gap-40 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              onOpenCaseStudy={() => setActiveProject(project)}
            />
          ))}
        </motion.div>

        <motion.div
          onViewportEnter={() => setActiveTier("archive")}
          viewport={{ margin: "-30% 0px -30% 0px" }}
          className="mt-40 md:mt-60 pt-20"
        >
          <h3 className="sr-only">Archived Projects</h3>
          <div className="flex flex-col gap-12 md:gap-24 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            {archiveProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onOpenCaseStudy={() => setActiveProject(project)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
