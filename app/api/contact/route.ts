import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import { rateLimit, validateContact } from "./validate";

// POST handlers always run per-request, and the default Node.js runtime is the
// one nodemailer needs for its TCP socket — no route segment config required.

const RATE_LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };

let transporter: Transporter | null = null;

/**
 * Built once per instance and reused — creating a transport per request throws
 * away connection pooling for no benefit.
 */
function getTransporter(): Transporter | null {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error(
      "[contact] EMAIL_USER and EMAIL_PASS must both be set; refusing to send.",
    );
    return null;
  }

  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return transporter;
}

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
  const { allowed, retryAfterSeconds } = rateLimit(clientIp(request), RATE_LIMIT);
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

  const mailer = getTransporter();
  if (!mailer) {
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const { name, email, message } = result.data;

  try {
    await mailer.sendMail({
      // Always send as the authenticated mailbox — spoofing the visitor's
      // address here would fail SPF/DKIM and land in spam.
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  } catch (error) {
    // Logged server-side only: SMTP errors can echo back configuration detail.
    console.error("[contact] Failed to send message:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please email me directly." },
      { status: 502 },
    );
  }
}
