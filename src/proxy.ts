import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Sliding window in-memory rate limiter cache
const ipCache = new Map<string, { count: number; resetTime: number }>();

interface RateLimitRule {
  limit: number;
  windowMs: number;
}

const RULES: Record<string, RateLimitRule> = {
  login: { limit: 5, windowMs: 60 * 1000 },      // 5 requests per 1 minute
  adminApi: { limit: 60, windowMs: 60 * 1000 },  // 60 requests per 1 minute
  images: { limit: 120, windowMs: 60 * 1000 },   // 120 requests per 1 minute
  general: { limit: 200, windowMs: 10 * 1000 },  // 200 requests per 10 seconds (DoS defense)
};

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return (request as any).ip || "127.0.0.1";
}

function isRateLimited(ip: string, category: keyof typeof RULES): boolean {
  const now = Date.now();
  const cacheKey = `${ip}:${category}`;
  const rule = RULES[category];

  // Prune cache if it grows too large
  if (ipCache.size > 2000) {
    for (const [key, value] of ipCache.entries()) {
      if (now > value.resetTime) {
        ipCache.delete(key);
      }
    }
  }

  const record = ipCache.get(cacheKey);
  if (!record || now > record.resetTime) {
    ipCache.set(cacheKey, {
      count: 1,
      resetTime: now + rule.windowMs,
    });
    return false;
  }

  record.count++;
  if (record.count > rule.limit) {
    return true;
  }

  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // 1. Rate Limiting Check
  let limitCategory: keyof typeof RULES = "general";
  if (pathname === "/api/admin/login") {
    limitCategory = "login";
  } else if (pathname.startsWith("/api/admin/")) {
    limitCategory = "adminApi";
  } else if (pathname.startsWith("/api/images/")) {
    limitCategory = "images";
  }

  if (isRateLimited(ip, limitCategory)) {
    return new NextResponse(
      JSON.stringify({ error: "Demasiadas peticiones. Por favor, inténtalo más tarde." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  // 2. HTTPS Redirect in production (behind reverse proxy)
  const proto = request.headers.get("x-forwarded-proto");
  if (process.env.NODE_ENV === "production" && proto === "http") {
    const secureUrl = new URL(request.url);
    secureUrl.protocol = "https:";
    return NextResponse.redirect(secureUrl, 301);
  }

  // 3. Process Request
  const response = NextResponse.next();

  // 4. Inject Security Headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://images.unsplash.com https://plus.unsplash.com https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://googleadservices.com;
    connect-src 'self' https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.es;
    upgrade-insecure-requests;
  `;
  const cleanCsp = cspHeader.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", cleanCsp);
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  // 5. Staging Indexation Prevention
  if (process.env.IS_STAGING === "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.svg (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg).*)',
  ],
};
