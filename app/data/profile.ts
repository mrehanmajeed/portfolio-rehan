/**
 * Single source of truth for every piece of content on the site.
 *
 * Nothing here is inferred or embellished — each entry maps to a line in
 * `public/Muhammad-Rehan-Majeed-CV.pdf`. Links that do not exist yet are `null`
 * rather than a placeholder URL, and the UI simply omits the corresponding
 * button. Never commit a fabricated URL here.
 */

export const profile = {
  name: "Muhammad Rehan Majeed",
  role: "Software Developer",
  discipline: "AI Engineering & Full-Stack Architecture",
  location: "Lahore, Pakistan",
  email: "rehanmajeed00345@gmail.com",
  phone: "+92 317 7282081",
  phoneHref: "+923177282081",
  resume: "/Muhammad-Rehan-Majeed-CV.pdf",
  summary:
    "Software Developer with experience in full-stack development, database architecture, and machine learning. Focused on building secure, scalable, and data-driven applications.",
  seeking:
    "Seeking opportunities in Software Engineering, Data Science, and AI/ML.",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rehan-majeed/" },
  { label: "GitHub", href: "https://github.com/mrehanmajeed" },
] as const;

/** Rotating phrases for the philosophy typewriter. Keep the leading space. */
export const philosophyPhrases = [
  " retrieval-augmented AI systems.",
  " autonomous agent pipelines.",
  " secure, well-documented REST APIs.",
  " normalized database architectures.",
  " production-grade automation.",
  " full-stack web applications.",
] as const;

export type Experience = {
  company: string;
  title: string;
  location: string;
  period: string;
  /** The most recent role — rendered with a filled marker. Not a claim of present employment. */
  mostRecent?: boolean;
  summary: string;
};

export const experience: Experience[] = [
  {
    company: "Mavericks United",
    title: "Associate AI Automations Engineer",
    location: "Lahore, Pakistan",
    period: "Jun 2026 — Sep 2026",
    mostRecent: true,
    summary:
      "Built production-grade AI automation systems with Python, LLM APIs, and agentic AI frameworks, integrating multiple LLM providers into scalable real-world solutions. Delivered a Business Development Automation Agent covering the full BD lifecycle — lead discovery, qualification, outreach, and follow-ups.",
  },
  {
    company: "SmartTec Analytics — Industry Collaboration",
    title: "AI/ML Engineer",
    location: "Lahore, Pakistan",
    period: "Dec 2025 — May 2026",
    summary:
      "Final Year Project delivered in collaboration with SmartTec Analytics: ChatBU, a production-oriented RAG assistant for Bahria University. Engineered the AI and backend pipeline with Django REST Framework, LangChain, FAISS, and Gemini, and shipped MySQL + Power BI analytics for query logging and administrative insight.",
  },
  {
    company: "Code Generation",
    title: "Junior AI/ML Developer",
    location: "Islamabad, Pakistan",
    period: "Oct 2025 — Dec 2025",
    summary:
      "Contributed to AI/ML-driven code generation solutions, supported model training and testing for real-world use cases, and collaborated with senior engineers on applied AI research.",
  },
  {
    company: "Systems Limited",
    title: "Full-Stack Developer — Intern",
    location: "Lahore, Pakistan",
    period: "Jul 2025 — Sep 2025",
    summary:
      "Built responsive front-ends in React, Bootstrap, and Tailwind CSS, designed backend APIs with Django REST Framework against MySQL, and implemented JWT authentication for secure access and dashboard management.",
  },
];

export const education = {
  institution: "Bahria University",
  degree: "BS in Computer Science",
  period: "2022 — 2026",
  grade: "CGPA: 3.45 / 4.00",
  detail:
    "Specialised in artificial intelligence, software engineering, and database systems. Final Year Project delivered as an industry collaboration with SmartTec Analytics — ChatBU, a retrieval-augmented assistant now deployed at Bahria University Lahore Campus.",
};

export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Python", "JavaScript", "C / C++", "SQL"] },
  {
    title: "AI / ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "LLM APIs",
      "Agentic AI Frameworks",
      "RAG",
      "LoRA Fine-Tuning",
      "Pandas / NumPy",
    ],
  },
  {
    title: "Backend",
    items: [
      "FastAPI",
      "Django REST Framework",
      "REST API Design",
      "JWT Authentication",
      "OAuth2",
      "Postman / Thunder Client",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "HTML / CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Databases",
    items: [
      "MySQL",
      "PostgreSQL",
      "Microsoft SQL Server",
      "MongoDB",
      "SQLite",
      "Supabase",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Git / GitHub",
      "Linux",
      "AWS EC2",
      "Power BI",
      "Google Colab",
      "MySQL Workbench",
    ],
  },
];

export type Project = {
  /** Stable slug — also the anchor id (`#project-<slug>`). */
  slug: string;
  title: string;
  /** `featured` renders as a large dark card, `archive` as a compact light one. */
  tier: "featured" | "archive";
  /** Two-letter monogram shown in the card's tile. */
  monogram: string;
  stack: string;
  summary: string;
  liveDemo?: string;
  repo?: string;
  caseStudy: { problem: string; solution: string; impact: string };
};

export const projects: Project[] = [
  {
    slug: "chatbu",
    title: "ChatBU",
    tier: "featured",
    monogram: "CB",
    stack: "Django REST • LangChain • FAISS • Gemini • React • Power BI",
    summary:
      "A retrieval-augmented AI assistant for Bahria University, grounded strictly in official institutional documentation, with Power BI dashboards for real-time analytics on student queries and system performance.",
    liveDemo: "https://bahria-unibot-v1.netlify.app/",
    caseStudy: {
      problem:
        "Students and staff at Bahria University had no single reliable channel for policy, programme, and admissions information. Answers were scattered across PDFs and departmental pages, and a general-purpose chatbot would invent details the university could not stand behind.",
      solution:
        "Engineered an end-to-end RAG pipeline in Python and Django REST Framework: document ingestion, intfloat/e5-base-v2 embeddings indexed in FAISS, semantic retrieval with similarity thresholding to refuse out-of-scope questions, and Gemini for grounded generation with source citations. A MySQL and Power BI layer logs every query with programme and intent classification for administrative insight. Deployed on AWS EC2 with Netlify, Cloudflare Tunnels, and PM2.",
      impact:
        "Reached 98.2% overall accuracy, a hallucination rate under 1%, and 99.9% availability during evaluation. ChatBU is deployed for use at Bahria University Lahore Campus.",
    },
  },
  {
    slug: "bd-automation-agent",
    title: "BD Automation Agent",
    tier: "featured",
    monogram: "BD",
    stack: "Python • Playwright • Vision LLM • Agentic Loop",
    summary:
      "The autonomous browser-automation engine behind an AI-driven job-application platform — a vision-guided agent that reads a page, decides one action at a time, and submits real applications across 20+ ATS platforms.",
    caseStudy: {
      problem:
        "Applicant tracking systems each expose a different DOM, and hard-coded selectors break the moment a vendor ships a redesign. Scripted automation could not survive across Greenhouse, Lever, Workday, Dice, Ashby, and iCIMS without constant maintenance.",
      solution:
        "Built a vision-driven agent loop in Python and Playwright: capture a screenshot plus a scoped DOM snapshot, let the LLM choose exactly one action, execute it, and repeat. Integrated captcha-solving and Gmail OTP verification to clear human-verification gates, and added a learned-selector memory that caches resolved elements so repeat visits skip the model call.",
      impact:
        "Achieved real end-to-end confirmed submissions across more than twenty ATS platforms, with the selector memory materially cutting per-application LLM cost.",
    },
  },
  {
    slug: "talentai",
    title: "TalentAI",
    tier: "featured",
    monogram: "TA",
    stack: "FastAPI • React.js • SQLite",
    summary:
      "An AI-powered recruitment management system that screens résumés, matches candidates to roles, and automates evaluation to support data-driven hiring decisions.",
    caseStudy: {
      problem:
        "Recruitment teams lose most of their time to the first pass — reading every résumé and manually judging fit against a job description before any real assessment begins.",
      solution:
        "Built an intelligent recruitment platform on FastAPI, React.js, and SQLite with AI-driven résumé screening, candidate-to-job matching, and automated candidate evaluation, exposed through secure RESTful APIs covering the end-to-end recruitment workflow.",
      impact:
        "Turned an unstructured pile of applications into ranked, comparable candidate data, letting hiring decisions rest on consistent evaluation rather than reading order.",
    },
  },
  {
    slug: "content-automation-bot",
    title: "Content Creation Automation Bot",
    tier: "featured",
    monogram: "CA",
    stack: "FastAPI • OAuth2 • Telegram Bot API",
    summary:
      "A team-built Telegram bot that generates AI videos and publishes them straight to YouTube, TikTok, and Instagram. I owned the backend and its authentication security.",
    caseStudy: {
      problem:
        "Publishing generated video to three social platforms meant three separate OAuth2 flows, and the project was carrying provider credentials in source with an integration suite that did not pass.",
      solution:
        "Owned the backend and authentication security: built the OAuth2 publishing routes for YouTube, TikTok, and Instagram in FastAPI, and migrated every credential out of the codebase into environment variables.",
      impact:
        "Brought all 15 integration tests to passing and removed committed secrets from the repository, leaving a publishing path safe to run against live provider accounts.",
    },
  },
  {
    slug: "dormflow-db",
    title: "DormFlow DB",
    tier: "archive",
    monogram: "DF",
    stack: "MySQL • Database Design",
    summary:
      "A normalized MySQL database for hostel management, automating student records and room allocation workflows.",
    caseStudy: {
      problem:
        "Hostel administration ran on disconnected manual records, which made room allocation error-prone and left student data inconsistent across sheets.",
      solution:
        "Designed a normalized MySQL schema with the constraints and relationships needed to enforce data integrity, then implemented the CRUD operations driving student records and room allocation.",
      impact:
        "Replaced manual bookkeeping with a schema where integrity is enforced by the database rather than by convention.",
    },
  },
  {
    slug: "swiftstay",
    title: "SwiftStay",
    tier: "archive",
    monogram: "SS",
    stack: "C++ • OOP • File Handling",
    summary:
      "A modular C++ booking system built on object-oriented principles, with file-backed persistence and automated travel cost calculation.",
    caseStudy: {
      problem:
        "A booking system needs state that survives the process, and a flat procedural design makes both persistence and pricing rules difficult to extend.",
      solution:
        "Built a modular booking system in C++ around OOP principles, with file handling for persistent storage and automated travel cost calculation.",
      impact:
        "Produced a maintainable console application demonstrating encapsulation, modular decomposition, and persistence without a database engine.",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const archiveProjects = projects.filter((p) => p.tier === "archive");

export type Certificate = { title: string; issuer: string };

export const certificates: Certificate[] = [
  { title: "Certified AI Foundations Associate", issuer: "Oracle" },
  { title: "Data Science and Analytics Certification", issuer: "HP LIFE" },
  { title: "Google AI Essentials", issuer: "Coursera" },
  { title: "Claude Code 101", issuer: "Anthropic" },
  { title: "Claude Code in Action", issuer: "Anthropic" },
  { title: "Claude 101", issuer: "Anthropic" },
];

export const navLinks = [
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Skills", target: "skills" },
  { label: "Work", target: "work" },
  { label: "Contact", target: "contact" },
] as const;

const FALLBACK_SITE_URL = "https://portfolio-rehan.vercel.app";

/**
 * Resolves the absolute origin used for metadata, sitemap, and robots.
 *
 * Next inlines `process.env.NEXT_PUBLIC_*` at build time and substitutes an
 * empty string when the variable is unset, so `??` never fires and
 * `new URL("")` throws — which fails the production build rather than the
 * page. A bare host is accepted too, since that is the easy thing to paste
 * into a dashboard, and anything unparseable falls back instead of breaking
 * the deploy.
 */
export function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return FALLBACK_SITE_URL;

  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/** Set NEXT_PUBLIC_SITE_URL in the Vercel project settings once live. */
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
