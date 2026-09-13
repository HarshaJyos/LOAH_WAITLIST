"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Spambot trap field
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          honeypot: honeypot, // If filled by bot, server rejects/ignores
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setIsAlreadyRegistered(Boolean(data.alreadyRegistered));
      setStatus("success");

      // Sensory-friendly celebration confetti
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.7 },
          colors: ["#10B981", "#34D399", "#6366F1", "#F8FAFC"],
          disableForReducedMotion: true,
        });
      } catch {
        // graceful fallback if canvas is restricted
      }
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-xl mx-auto animate-fade-in-scale">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#161F2E]/90 border border-[#10B981]/40 shadow-xl backdrop-blur-md flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Early Access Confirmed
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#F8FAFC]">
              {isAlreadyRegistered ? "You're already on the list!" : "You’re on the list."}
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base font-body max-w-md">
              Episode 1 of our build documentary drops soon. We’ll notify <span className="text-[#F8FAFC] font-medium">{email}</span> the moment it’s ready.
            </p>
          </div>

          <div className="pt-2 w-full flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setEmail("");
                setIsAlreadyRegistered(false);
              }}
              className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] underline underline-offset-4 transition-colors"
            >
              Sign up with another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full space-y-3" noValidate>
        {/* Hidden Honeypot Field for Spambots */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Form Container with 56px Action Target */}
        <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 rounded-2xl bg-[#161F2E]/80 border border-white/10 focus-within:border-[#10B981]/60 focus-within:ring-2 focus-within:ring-[#10B981]/20 transition-all shadow-lg backdrop-blur-md">
          {/* Email Input */}
          <input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            placeholder="Enter your email address..."
            disabled={status === "loading"}
            className="w-full h-14 px-5 bg-transparent text-[#F8FAFC] placeholder-[#94A3B8]/60 text-base font-body rounded-xl focus:outline-none disabled:opacity-50"
            autoComplete="email"
            required
            aria-label="Email Address for Waitlist"
          />

          {/* High-Dopamine Mint CTA Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-14 px-7 shrink-0 rounded-xl bg-[#10B981] hover:bg-[#059669] active:scale-[0.98] text-[#022C22] font-heading font-bold text-base tracking-tight transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed select-none"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Securing Spot...</span>
              </>
            ) : (
              <>
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>

        {/* Validation Error Banner if any */}
        {errorMessage && (
          <p className="text-xs sm:text-sm text-red-400 font-medium px-2 animate-fade-in-scale">
            {errorMessage}
          </p>
        )}

        {/* Micro-copy footer under action box */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#94A3B8] font-body text-center pt-1">
          <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>
            <strong className="font-medium text-[#F8FAFC]">100% free</strong> during open development. Watch us build it live week-by-week.
          </span>
        </div>
      </form>
    </div>
  );
}
