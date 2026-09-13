import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0F17",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "LOAH — Built for ADHD minds",
  description:
    "Standard planners are built for neurotypical brains. We're building one for ADHD minds—to clear chaotic brain noise instantly and get you moving without the burnout.",
  keywords: [
    "ADHD planner",
    "executive dysfunction",
    "task initiation",
    "dopamine",
    "neurodivergent productivity",
    "LOAH",
  ],
  openGraph: {
    title: "LOAH — Built for ADHD minds",
    description:
      "You know exactly what you need to do. So why is starting so damn hard? Get early access to LOAH.",
    type: "website",
    siteName: "LOAH",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOAH — Built for ADHD minds",
    description: "You know exactly what you need to do. So why is starting so damn hard?",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} dark antialiased`}>
      <body className="bg-[#0B0F17] text-[#F8FAFC] font-body selection:bg-[#10B981]/20 selection:text-[#10B981] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
