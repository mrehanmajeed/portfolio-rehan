import assert from "node:assert/strict";
import test from "node:test";
import { rateLimit, resetRateLimit, validateContact } from "./validate.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to discuss an engineering role with your team.",
};

test("accepts a well-formed message and normalises it", () => {
  const result = validateContact({ ...valid, email: "  ADA@Example.com " });
  assert.equal(result.ok, true);
  assert.deepEqual(result.ok && result.data, { ...valid });
});

test("rejects non-object bodies", () => {
  for (const body of [null, "hello", 42, undefined]) {
    assert.equal(validateContact(body).ok, false);
  }
});

test("rejects missing or short fields", () => {
  assert.equal(validateContact({ ...valid, name: "A" }).ok, false);
  assert.equal(validateContact({ ...valid, message: "too short" }).ok, false);
  assert.equal(validateContact({ email: valid.email }).ok, false);
});

test("rejects malformed email addresses", () => {
  for (const email of ["ada", "ada@", "@example.com", "ada@example", "a b@c.com"]) {
    assert.equal(validateContact({ ...valid, email }).ok, false, email);
  }
});

test("rejects oversized input", () => {
  assert.equal(validateContact({ ...valid, name: "x".repeat(101) }).ok, false);
  assert.equal(
    validateContact({ ...valid, message: "x".repeat(4001) }).ok,
    false,
  );
});

test("strips CRLF so mail headers cannot be injected", () => {
  const result = validateContact({
    ...valid,
    name: "Ada\r\nBcc: victim@example.com",
  });
  assert.equal(result.ok, true);
  assert.ok(result.ok && !/[\r\n]/.test(result.data.name));
});

test("silently rejects anything that fills the honeypot", () => {
  assert.equal(validateContact({ ...valid, website: "http://spam" }).ok, false);
  assert.equal(validateContact({ ...valid, website: "" }).ok, true);
});

test("rate limit allows up to the limit, then blocks until the window resets", () => {
  resetRateLimit();
  const options = { limit: 2, windowMs: 1000 };

  assert.equal(rateLimit("1.1.1.1", options, 0).allowed, true);
  assert.equal(rateLimit("1.1.1.1", options, 10).allowed, true);
  assert.equal(rateLimit("1.1.1.1", options, 20).allowed, false);

  // A different caller is unaffected.
  assert.equal(rateLimit("2.2.2.2", options, 20).allowed, true);

  // Past the window, the original caller is allowed again.
  assert.equal(rateLimit("1.1.1.1", options, 1001).allowed, true);
});
