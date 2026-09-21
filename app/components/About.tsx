"use client";

import { useTypewriter } from "../hooks/useTypewriter";
import { philosophyPhrases, profile } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const phrase = useTypewriter(philosophyPhrases, { loop: true });

  return (
    <section
      id="about"
      className="relative w-full bg-cream py-20 md:py-32 px-6 md:px-20 border-b border-black/10"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-12">
        <div>
          <SectionHeading number="01" title="Philosophy" />
          <p className="font-cormorant text-2xl md:text-5xl leading-[1.3] md:leading-[1.2] text-ink font-light min-h-[130px] md:min-h-[120px]">
            Systems earn trust by being grounded, measurable, and secure.
            <br className="hidden md:block" />
            <span className="font-medium text-black/70 italic">
              Building{phrase}
            </span>
            <span className="blinking-cursor" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-xs md:text-sm text-ink/80 leading-relaxed font-light mt-4 md:mt-8 pt-8 md:pt-12 border-t border-black/10">
          <p>
            I am a Software Developer working across AI engineering and
            full-stack architecture. Most recently I served as an Associate AI
            Automations Engineer at <b>Mavericks United</b>, building agentic
            automation on Python and LLM APIs. My work spans retrieval-augmented
            assistants, autonomous browser agents, and production REST APIs,
            with earlier roles at <b>Code Generation</b> and{" "}
            <b>Systems Limited</b>.
          </p>
          <div>
            <p className="mb-8">
              My Final Year Project, delivered as an industry collaboration with{" "}
              <b>SmartTec Analytics</b>, produced <b>ChatBU</b> — a RAG
              assistant grounded in official university documentation that
              reached 98.2% accuracy with a hallucination rate under 1%, and is
              deployed at Bahria University Lahore Campus.
            </p>
            <h3 className="text-[10px] uppercase tracking-widest font-semibold text-black/40 mb-3">
              Open To
            </h3>
            <p className="italic">{profile.seeking}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
