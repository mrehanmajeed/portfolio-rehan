import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink text-cream flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
        Error 404
      </p>
      <h1 className="font-cormorant text-5xl md:text-7xl font-light">
        This page doesn&apos;t exist.
      </h1>
      <Link
        href="/"
        className="mt-2 px-6 py-3 bg-cream text-ink text-[10px] uppercase tracking-widest font-semibold hover:bg-cream/80 transition-colors"
      >
        Back to the portfolio
      </Link>
    </main>
  );
}
