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
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loah.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LOAH — Built for ADHD minds",
    template: "%s | LOAH",
  },
  description:
    "Standard planners are built for neurotypical brains. We're building LOAH for ADHD minds—to clear chaotic brain noise instantly and get you moving without the burnout.",
  keywords: [
    "ADHD planner",
    "ADHD notes app",
    "executive dysfunction",
    "task initiation",
    "zero friction brain dump",
    "dopamine",
    "neurodivergent productivity",
    "working memory externalization",
    "LOAH",
  ],
  authors: [{ name: "LOAH Team", url: `${baseUrl}/team` }],
  creator: "LOAH",
  publisher: "LOAH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LOAH — Built for ADHD minds",
    description:
      "You know exactly what you need to do. So why is starting so damn hard? Experience zero-activation externalization designed for ADHD minds.",
    url: baseUrl,
    siteName: "LOAH",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOAH — Built for ADHD minds",
    description:
      "You know exactly what you need to do. So why is starting so damn hard? Get early access to LOAH.",
    creator: "@loah_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "LOAH",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.ico`,
        },
        description:
          "Zero-activation brain dump and thought externalization platform designed specifically for ADHD minds.",
        sameAs: ["https://x.com", "https://linkedin.com", "https://github.com"],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "LOAH",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/journal?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} dark antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0B0F17] text-[#F8FAFC] font-body selection:bg-[#10B981]/20 selection:text-[#10B981] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
