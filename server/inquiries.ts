const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const ALLOWED_GOALS = new Set(["0", "1", "2", "3"]);
const ALLOWED_SIZES = new Set(["1", "5", "8"]);
const ALLOWED_PACKAGES = new Set(["0", "1"]);
const ALLOWED_LOCALES = new Set(["cs", "en"]);

type D1Result<T = unknown> = { results?: T[]; success: boolean };

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface InquiryEnvironment {
  DB: D1Database;
  LEAD_HASH_SECRET?: string;
}

type InquiryPayload = {
  idempotencyKey: string;
  name: string;
  email: string;
  company: string;
  message: string;
  goal: string;
  size: string;
  package: string;
  locale: string;
  website: string;
  startedAt: number;
};

type ValidationResult =
  | { ok: true; value: InquiryPayload }
  | { ok: false; field?: string; message: string };

export async function handleInquiry(request: Request, env: InquiryEnvironment): Promise<Response> {
  const url = new URL(request.url);

  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  if (request.headers.get("origin") !== url.origin) return json({ error: "Invalid request origin." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "Expected application/json." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  let rawPayload: unknown;
  try {
    rawPayload = JSON.parse(rawBody);
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const validation = validatePayload(rawPayload);
  if (!validation.ok) return json({ error: validation.message, field: validation.field }, 422);
  const payload = validation.value;

  // Honeypots receive a normal success response so automated senders get no signal.
  if (payload.website) return json({ ok: true }, 202);

  const age = Date.now() - payload.startedAt;
  if (age < 1_500 || age > 24 * 60 * 60 * 1000) return json({ error: "Form session expired.", code: "FORM_EXPIRED" }, 422);
  if (!env.LEAD_HASH_SECRET || env.LEAD_HASH_SECRET.length < 24) {
    return json({ error: "The form is temporarily unavailable." }, 503);
  }

  const now = Date.now();
  const windowStartedAt = Math.floor(now / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_WINDOW_MS;
  const clientIp = request.headers.get("cf-connecting-ip") ?? "local";
  const fingerprint = await hmacHex(env.LEAD_HASH_SECRET, `${clientIp}:${windowStartedAt}`);

  await env.DB.prepare(
    `INSERT INTO inquiry_rate_limits (fingerprint, window_started_at, request_count, last_seen_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(fingerprint) DO UPDATE SET
       request_count = request_count + 1,
       last_seen_at = excluded.last_seen_at`,
  ).bind(fingerprint, windowStartedAt, now).run();

  const rate = await env.DB.prepare(
    "SELECT request_count AS requestCount FROM inquiry_rate_limits WHERE fingerprint = ?",
  ).bind(fingerprint).first<{ requestCount: number }>();

  if ((rate?.requestCount ?? RATE_LIMIT_MAX + 1) > RATE_LIMIT_MAX) {
    return json({ error: "Too many requests. Please try again later.", code: "RATE_LIMITED" }, 429, { "Retry-After": "600" });
  }

  const emailDomainStatus = await emailDomainAcceptsMail(payload.email);
  if (emailDomainStatus === "invalid") {
    return json({ error: "Email domain does not accept mail.", field: "email", code: "EMAIL_DOMAIN_INVALID" }, 422);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO inquiries
       (id, created_at, name, email, company, message, goal, website_size, package_name, locale, status, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
    ).bind(
      payload.idempotencyKey,
      now,
      payload.name,
      payload.email.toLowerCase(),
      payload.company,
      payload.message,
      payload.goal,
      payload.size,
      payload.package,
      payload.locale,
      fingerprint,
    ).run();
  } catch (error) {
    // Duplicate idempotency keys mean the original request was already accepted.
    const existing = await env.DB.prepare("SELECT id FROM inquiries WHERE id = ?")
      .bind(payload.idempotencyKey)
      .first<{ id: string }>();
    if (!existing) throw error;
  }

  return json({ ok: true, id: payload.idempotencyKey }, 201);
}

function validatePayload(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, message: "Invalid form data." };
  }

  const input = value as Record<string, unknown>;
  const idempotencyKey = clean(input.idempotencyKey, 80);
  const name = clean(input.name, 100);
  const email = clean(input.email, 254);
  const company = clean(input.company, 120);
  const message = clean(input.message, 1_500);
  const goal = clean(input.goal, 4);
  const size = clean(input.size, 4);
  const packageName = clean(input.package, 4);
  const locale = clean(input.locale, 4);
  const website = clean(input.website, 200);
  const startedAt = typeof input.startedAt === "number" ? input.startedAt : Number.NaN;

  if (!/^[0-9a-f-]{36}$/i.test(idempotencyKey)) return invalid("idempotencyKey");
  if (name.length < 2) return invalid("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) return invalid("email");
  if (company.length < 2) return invalid("company");
  if (!ALLOWED_GOALS.has(goal)) return invalid("goal");
  if (!ALLOWED_SIZES.has(size)) return invalid("size");
  if (!ALLOWED_PACKAGES.has(packageName)) return invalid("package");
  if (!ALLOWED_LOCALES.has(locale)) return invalid("locale");
  if (!Number.isSafeInteger(startedAt)) return invalid("startedAt");

  return {
    ok: true,
    value: { idempotencyKey, name, email, company, message, goal, size, package: packageName, locale, website, startedAt },
  };
}

function clean(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/gu, " ").replace(/\s+/gu, " ").trim().slice(0, maxLength);
}

function invalid(field: string): ValidationResult {
  return { ok: false, field, message: "Please check the highlighted field." };
}

async function emailDomainAcceptsMail(email: string): Promise<"valid" | "invalid" | "unknown"> {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  const mx = await dnsRecordStatus(domain, "MX", 15);
  if (mx === "present") return "valid";
  if (mx === "unknown") return "unknown";

  // SMTP permits delivery to an address record when no MX record exists.
  const [ipv4, ipv6] = await Promise.all([
    dnsRecordStatus(domain, "A", 1),
    dnsRecordStatus(domain, "AAAA", 28),
  ]);
  if (ipv4 === "present" || ipv6 === "present") return "valid";
  if (ipv4 === "unknown" || ipv6 === "unknown") return "unknown";
  return "invalid";
}

async function dnsRecordStatus(domain: string, recordType: string, numericType: number): Promise<"present" | "missing" | "unknown"> {
  try {
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${recordType}`, {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(2_500),
    });
    if (!response.ok) return "unknown";
    const result = await response.json() as { Status?: number; Answer?: Array<{ type?: number; data?: string }> };
    if (result.Status === 3) return "missing";
    if (result.Status !== 0) return "unknown";
    const matchingAnswers = result.Answer?.filter((answer) => answer.type === numericType) ?? [];
    if (recordType === "MX" && matchingAnswers.some((answer) => /^\s*0\s+\.\s*$/u.test(answer.data ?? ""))) return "missing";
    return matchingAnswers.length > 0 ? "present" : "missing";
  } catch {
    return "unknown";
  }
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(body: Record<string, unknown>, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });
}
