import assert from "node:assert/strict";
import test from "node:test";
import { resolveSiteUrl } from "./profile.ts";

const FALLBACK = "https://portfolio-rehan.vercel.app";

test("falls back when the variable is unset", () => {
  assert.equal(resolveSiteUrl(undefined), FALLBACK);
});

test("falls back on empty or whitespace — what Next inlines when unset", () => {
  // This is the exact input that broke the first Vercel deploy.
  assert.equal(resolveSiteUrl(""), FALLBACK);
  assert.equal(resolveSiteUrl("   "), FALLBACK);
});

test("keeps a well-formed origin", () => {
  assert.equal(
    resolveSiteUrl("https://portfolio-rehan.vercel.app"),
    "https://portfolio-rehan.vercel.app",
  );
});

test("accepts a bare host and adds https", () => {
  assert.equal(resolveSiteUrl("portfolio-rehan.vercel.app"), FALLBACK);
  assert.equal(resolveSiteUrl("example.com"), "https://example.com");
});

test("strips a trailing slash or path so metadataBase stays an origin", () => {
  assert.equal(resolveSiteUrl("https://example.com/"), "https://example.com");
  assert.equal(resolveSiteUrl("https://example.com/about"), "https://example.com");
});

test("falls back on unparseable input instead of failing the build", () => {
  for (const bad of ["http://", "https://", ":::", "http:// space"]) {
    assert.equal(resolveSiteUrl(bad), FALLBACK, bad);
  }
});
