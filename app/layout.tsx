import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { profile, siteUrl, socials } from "./data/profile";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const title = `${profile.name} | ${profile.role}`;
const description = `${profile.summary} ${profile.seeking}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Developer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "Python",
    "FastAPI",
    "Django REST Framework",
    "React",
    "RAG",
    "Lahore",
    "Pakistan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "light",
};

/** Structured data so search engines read the page as a person, not a blog post. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bahria University" },
  sameAs: socials.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Extensions such as Grammarly and password managers inject attributes
          onto <body> before React hydrates, which React reports as a mismatch.
          suppressHydrationWarning applies to this element only — a genuine
          mismatch anywhere inside the tree is still reported. */}
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} font-sans selection:bg-ink selection:text-cream`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
