"use client";

import { useState, type FormEvent } from "react";
import { LIMITS } from "../api/contact/validate";
import { profile, socials } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

type Status = { tone: "success" | "error"; text: string } | null;

const FIELD_CLASS =
  "bg-transparent border-b border-cream/20 py-2 md:py-3 text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream transition-colors";
const LABEL_CLASS =
  "text-[9px] md:text-[10px] uppercase tracking-widest text-cream/60 mb-2";

export function Contact() {
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          tone: "success",
          text: "Thank you — your message has been sent.",
        });
        form.reset();
      } else {
        setStatus({
          tone: "error",
          text: body.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        tone: "error",
        text: `Network error. You can email me directly at ${profile.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-ink text-cream py-20 md:py-32 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="06"
          title="Direct Inquiry"
          invert
          className="mb-4"
        />
        <h3 className="font-cormorant text-3xl md:text-6xl font-light mb-4">
          Start a conversation.
        </h3>
        <p className="text-xs md:text-sm font-light text-cream/60 mb-8 md:mb-12">
          Available for Software Engineering, Data Science, and AI/ML roles.
          Prefer email?{" "}
          <a
            href={`mailto:${profile.email}`}
            className="link-underline text-cream"
          >
            {profile.email}
          </a>
          {socials.map((social) => (
            <span key={social.label}>
              {" · "}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-cream"
              >
                {social.label}
              </a>
            </span>
          ))}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col">
              <label htmlFor="contact-name" className={LABEL_CLASS}>
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                minLength={LIMITS.name.min}
                maxLength={LIMITS.name.max}
                placeholder="Full Name"
                className={FIELD_CLASS}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact-email" className={LABEL_CLASS}>
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                maxLength={LIMITS.email.max}
                placeholder="you@example.com"
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="contact-message" className={LABEL_CLASS}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              minLength={LIMITS.message.min}
              maxLength={LIMITS.message.max}
              placeholder="Tell me about the role or project..."
              className={`${FIELD_CLASS} resize-none`}
            />
          </div>

          {/* Honeypot: invisible to people, irresistible to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 md:px-8 py-3 md:py-4 bg-cream text-ink text-[10px] md:text-xs uppercase tracking-widest font-semibold hover:bg-cream/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-[10px] md:text-xs uppercase tracking-widest ${
                status?.tone === "error" ? "text-red-300" : "text-cream/70"
              }`}
            >
              {status?.text}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
