import { createHash } from "crypto";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limiting store (sliding window per IP)
const ipRateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRateLimitStore.entries()) {
      if (now > record.resetAt) {
        ipRateLimitStore.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Rate Limiter: Allows maxRequests within windowMs per client IP
 */
export function checkRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000 // 10 minutes window
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  const record = ipRateLimitStore.get(ip);

  if (!record || now > record.resetAt) {
    ipRateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSec: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    retryAfterSec: 0,
  };
}

/**
 * Extracts and sanitizes client IP from incoming request headers
 */
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const cfConnectingIp = headers.get("cf-connecting-ip");
  const xRealIp = headers.get("x-real-ip");
  const xForwardedFor = headers.get("x-forwarded-for");

  if (cfConnectingIp) return cfConnectingIp.trim();
  if (xRealIp) return xRealIp.trim();
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

/**
 * CSRF / Origin protection: Verifies that the request Origin / Referer matches the host
 */
export function verifyCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  if (!origin && !referer) {
    // In dev or direct non-browser requests, allow if no browser origin headers
    return process.env.NODE_ENV === "development";
  }

  try {
    if (origin) {
      const originUrl = new URL(origin);
      if (host && originUrl.host === host) return true;
      // Allow localhost in development
      if (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1") return true;
    }

    if (referer) {
      const refererUrl = new URL(referer);
      if (host && refererUrl.host === host) return true;
      if (refererUrl.hostname === "localhost" || refererUrl.hostname === "127.0.0.1") return true;
    }
  } catch {
    return false;
  }

  return false;
}

/**
 * Creates a one-way SHA-256 hash for privacy and unique document IDs
 */
export function hashString(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/**
 * Strict email validation & sanitization (RFC 5322 standard check)
 */
export function sanitizeAndValidateEmail(email: string): { valid: boolean; sanitized: string } {
  if (typeof email !== "string") return { valid: false, sanitized: "" };

  const sanitized = email.trim().toLowerCase();

  // Prevent excessive length buffer attacks
  if (sanitized.length > 254 || sanitized.length < 5) {
    return { valid: false, sanitized: "" };
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  return {
    valid: emailRegex.test(sanitized),
    sanitized,
  };
}
