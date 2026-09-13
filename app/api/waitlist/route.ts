import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  checkRateLimit,
  getClientIp,
  verifyCsrfOrigin,
  hashString,
  sanitizeAndValidateEmail,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. CSRF / Origin Verification
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden request: Invalid origin." },
        { status: 403 }
      );
    }

    // 2. IP-based Rate Limiting (Max 5 attempts per 10 minutes per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp, 5, 10 * 60 * 1000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please try again in ${rateLimit.retryAfterSec} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSec),
          },
        }
      );
    }

    // 3. Parse Request Payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { email, honeypot } = body;

    // 4. Honeypot check (Spambot detection)
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Silently return success to bot without saving
      return NextResponse.json(
        { success: true, message: "Successfully joined waitlist." },
        { status: 200 }
      );
    }

    // 5. Strict Email Validation & Sanitization
    const { valid, sanitized: sanitizedEmail } = sanitizeAndValidateEmail(email);
    if (!valid) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 6. Secure Document Hash ID (Prevents PII in keys & ensures idempotency)
    const emailHash = hashString(sanitizedEmail);
    const waitlistDocRef = doc(db, "waitlist", emailHash);

    // 7. Check if already exists in Firestore (with graceful fallback)
    try {
      const existingDoc = await getDoc(waitlistDocRef);
      if (existingDoc.exists()) {
        return NextResponse.json(
          {
            success: true,
            alreadyRegistered: true,
            message: "You are already on the early access list!",
          },
          { status: 200 }
        );
      }
    } catch (checkErr: unknown) {
      // If getDoc is restricted, proceed directly to setDoc
      console.warn("Doc existence check skipped:", checkErr);
    }

    // 8. Atomic Write to Firestore
    const userAgent = req.headers.get("user-agent") || "unknown";
    const ipHash = hashString(clientIp);

    await setDoc(waitlistDocRef, {
      email: sanitizedEmail,
      createdAt: serverTimestamp(),
      status: "pending_invite",
      source: "web_landing_100vh",
      ipHash,
      userAgent: userAgent.slice(0, 150),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error: unknown) {
    console.error("Waitlist submission error:", error);
    
    // Check for Firebase permission error specifically to provide actionable feedback
    const errObj = error as { code?: string; message?: string };
    if (errObj?.code === "permission-denied") {
      return NextResponse.json(
        {
          error:
            "Firestore permission denied. Please ensure your Firestore Security Rules are published in the Firebase Console.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to secure waitlist spot. Please try again in a moment." },
      { status: 500 }
    );
  }
}
