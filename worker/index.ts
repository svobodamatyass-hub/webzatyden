/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { handleInquiry } from "../server/inquiries";

type RuntimeEnv = Env & {
  LEAD_HASH_SECRET?: string;
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
};

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: RuntimeEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/inquiries") {
      try {
        return withSecurityHeaders(await handleInquiry(request, env), url, createContentSecurityPolicy());
      } catch (error) {
        console.error(JSON.stringify({
          event: "inquiry_request_failed",
          path: url.pathname,
          ray: request.headers.get("cf-ray"),
          error: error instanceof Error ? error.message : "Unknown error",
        }));
        return withSecurityHeaders(new Response(JSON.stringify({ error: "The request could not be saved." }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
        }), url, createContentSecurityPolicy());
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({
            format: format as ImageOutputOptions["format"],
            quality,
          });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(response, url, createContentSecurityPolicy());
    }

    const nonce = createNonce();
    const policy = createContentSecurityPolicy(nonce);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Content-Security-Policy", policy);
    requestHeaders.set("x-nonce", nonce);
    const securedRequest = new Request(request, { headers: requestHeaders });

    return withSecurityHeaders(await handler.fetch(securedRequest, env, ctx), url, policy);
  },
} satisfies ExportedHandler<RuntimeEnv>;

function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return btoa(String.fromCharCode(...bytes));
}

function createContentSecurityPolicy(nonce?: string): string {
  const scripts = nonce
    ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
    : "script-src 'none'";
  const styles = nonce
    ? `style-src 'self' 'nonce-${nonce}'`
    : "style-src 'none'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    styles,
    "style-src-attr 'none'",
    scripts,
    "script-src-attr 'none'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join("; ");
}

function withSecurityHeaders(response: Response, url: URL, policy: string): Response {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", policy);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("Origin-Agent-Cluster", "?1");
  headers.set("X-Permitted-Cross-Domain-Policies", "none");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  const contentType = headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }
  if (url.protocol === "https:" && url.hostname !== "localhost") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default worker;
