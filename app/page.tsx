import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SensoryBackdrop } from "@/components/SensoryBackdrop";
import { Zap, Heart, Shield, Terminal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden select-none bg-[#0B0F17]">
      {/* Calm sensory ambient backdrop */}
      <SensoryBackdrop />

      {/* Top Navigation Bar */}
      <Header />

      {/* Main 100vh Centered Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto w-full z-10 -mt-2 sm:-mt-6">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161F2E]/90 border border-white/10 text-xs sm:text-sm text-[#94A3B8] font-medium mb-5 sm:mb-6 shadow-sm backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Engineered for ADHD minds • Zero activation energy</span>
        </div>

        {/* Option 2 Headline - Tight line-height (1.1 - 1.15), Bold, High Impact */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#F8FAFC] tracking-[-0.03em] leading-[1.12] sm:leading-[1.14] max-w-3xl mb-4 sm:mb-5">
          You know exactly what you need to do.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-[#E2E8F0] to-[#10B981]">
            So why is starting so damn hard?
          </span>
        </h1>

        {/* Sub-headline - Generous line-height (1.6) to prevent eye skipping */}
        <p className="font-body text-sm sm:text-base md:text-lg text-[#94A3B8] leading-[1.6] max-w-2xl mx-auto mb-7 sm:mb-9 font-normal">
          Standard planners are built for neurotypical brains. We’re building one for ADHD minds—to clear chaotic brain noise instantly and get you moving without the burnout.
        </p>

        {/* Interactive Action Box (56px touch target + instant confirmation) */}
        <div className="w-full">
          <WaitlistForm />
        </div>
      </main>

      {/* Unified Micro-Footer */}
      <Footer />
    </div>
  );
}
