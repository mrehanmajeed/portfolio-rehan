/**
 * Trust-boundary validation for the contact endpoint.
 *
 * Kept pure and dependency-free so it can be exercised directly by
 * `validate.test.ts` without booting Next or touching SMTP.
 */

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: ContactMessage }
  | { ok: false; error: string };

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 4000 },
} as const;

// Deliberately permissive: the real proof an address works is the reply.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Values interpolated into mail headers (subject, Reply-To) must not carry
 * line breaks, or a sender could append headers of their own and turn the
 * form into an open relay.
 */
const stripControlChars = (value: string) =>
  value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value : "";
}

export function validateContact(payload: unknown): ValidationResult {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const body = payload as Record<string, unknown>;

  // Honeypot: hidden in the form, so anything typed here is a bot. Reported as
  // a generic rejection to avoid teaching scrapers which field to skip.
  if (readString(body, "website").trim() !== "") {
    return { ok: false, error: "Invalid request body." };
  }

  const name = stripControlChars(readString(body, "name"));
  const email = stripControlChars(readString(body, "email")).toLowerCase();
  const message = readString(body, "message").trim();

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    return {
      ok: false,
      error: `Name must be between ${LIMITS.name.min} and ${LIMITS.name.max} characters.`,
    };
  }

  if (email.length > LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (
    message.length < LIMITS.message.min ||
    message.length > LIMITS.message.max
  ) {
    return {
      ok: false,
      error: `Message must be between ${LIMITS.message.min} and ${LIMITS.message.max} characters.`,
    };
  }

  return { ok: true, data: { name, email, message } };
}

/**
 * Fixed-window counter keyed by client IP.
 *
 * ponytail: per-instance memory, so a scaled-out deployment enforces the limit
 * per lambda rather than globally, and it resets on cold start. That is enough
 * to stop a single script hammering the form; move to Vercel KV or Upstash if
 * this ever needs to be exact.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60 * 60 * 1000 } = {},
  now = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });

    // Opportunistic sweep so the map cannot grow without bound.
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now >= v.resetAt) hits.delete(k);
    }
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= limit,
    retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
  };
}

/** Test seam: clears the rate-limit window between cases. */
export function resetRateLimit() {
  hits.clear();
}
