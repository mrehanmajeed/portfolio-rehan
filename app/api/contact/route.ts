import { NextResponse } from "next/server";
import { rateLimit, validateContact } from "./validate";
import { profile } from "../../data/profile";

const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 10_000;

/**
 * Resend's shared sender works with no domain verification, but it can only
 * deliver to the address the Resend account was created with — which is
 * exactly this form's job. Set CONTACT_FROM_EMAIL once a custom domain is
 * verified and mail will come from that instead, no code change needed.
 */
const FROM_ADDRESS =
  process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

/** Where enquiries land. Defaults to the address published on the site. */
const TO_ADDRESS = process.env.CONTACT_TO_EMAIL?.trim() || profile.email;

/** Vercel puts the real client IP first in x-forwarded-for. */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(
    clientIp(request),
    RATE_LIMIT,
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; refusing to send.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const { name, email, message } = result.data;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Sending as our own verified sender keeps SPF/DKIM valid; the
        // visitor's address goes in reply_to so Reply answers them, not us.
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: `${name} <${email}>`,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
      // A hung upstream should fail the request, not hold the function open.
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      // Logged server-side only: the body can echo configuration detail.
      const detail = await response.text().catch(() => "");
      console.error(
        `[contact] Resend rejected the message (${response.status}):`,
        detail,
      );
      return NextResponse.json(
        { error: "Failed to send your message. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  } catch (error) {
    console.error("[contact] Failed to reach the mail provider:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please email me directly." },
      { status: 502 },
    );
  }
}
