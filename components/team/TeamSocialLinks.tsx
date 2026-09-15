import React from "react";
import { TeamSocials } from "@/types/team";
import { Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Sleek X Icon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom Sleek LinkedIn Icon
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67s-.75-1.67-1.67-1.67a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

// Custom Sleek Instagram Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// Custom Sleek YouTube Icon
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Custom Sleek GitHub Icon
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// Custom Sleek Threads Icon
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.608 0 11.97 5.253 12.18 11.814v.667c0 4.133-2.906 7.234-7.234 7.234-2.484 0-4.66-1.11-5.787-3.048-.063.14-.143.276-.232.404-.764 1.106-2.023 1.776-3.374 1.776-2.316 0-4.198-1.882-4.198-4.198 0-2.315 1.882-4.197 4.198-4.197 1.351 0 2.61.67 3.374 1.776.089.128.169.264.232.404.996-1.706 2.894-2.673 4.987-2.673 3.036 0 5.034 2.146 5.034 5.127 0 .044 0 .089-.001.134-1.127-.271-2.416-.42-3.791-.42-4.475 0-7.397 2.474-7.397 5.86 0 3.238 2.645 5.567 6.136 5.567 2.84 0 5.195-1.575 6.07-4.004.839 2.43 3.195 4.004 6.035 4.004z" />
    </svg>
  );
}

// Custom Sleek TikTok Icon
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("w-3.5 h-3.5 fill-current", className)}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export interface TeamSocialLinksProps {
  socials?: TeamSocials;
  memberName?: string;
  variant?: "pill" | "icon-only" | "compact";
  className?: string;
}

export function TeamSocialLinks({
  socials,
  memberName = "Team Member",
  variant = "pill",
  className,
}: TeamSocialLinksProps) {
  if (!socials) return null;

  // Registry of all social networks with custom SVG icons
  const networks = [
    {
      key: "twitter",
      url: socials.twitter || socials.x,
      label: "X (Twitter)",
      icon: <XIcon />,
      color: "hover:text-[#F8FAFC] hover:border-white/30 hover:bg-white/[0.08]",
    },
    {
      key: "linkedin",
      url: socials.linkedin,
      label: "LinkedIn",
      icon: <LinkedinIcon />,
      color: "hover:text-[#38BDF8] hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/10",
    },
    {
      key: "instagram",
      url: socials.instagram,
      label: "Instagram",
      icon: <InstagramIcon />,
      color: "hover:text-[#F43F5E] hover:border-[#F43F5E]/40 hover:bg-[#F43F5E]/10",
    },
    {
      key: "youtube",
      url: socials.youtube,
      label: "YouTube",
      icon: <YoutubeIcon />,
      color: "hover:text-[#EF4444] hover:border-[#EF4444]/40 hover:bg-[#EF4444]/10",
    },
    {
      key: "github",
      url: socials.github,
      label: "GitHub",
      icon: <GithubIcon />,
      color: "hover:text-[#F8FAFC] hover:border-white/30 hover:bg-white/[0.08]",
    },
    {
      key: "threads",
      url: socials.threads,
      label: "Threads",
      icon: <ThreadsIcon />,
      color: "hover:text-[#F8FAFC] hover:border-white/30 hover:bg-white/[0.08]",
    },
    {
      key: "website",
      url: socials.website,
      label: "Website",
      icon: <Globe className="w-3.5 h-3.5" />,
      color: "hover:text-[#10B981] hover:border-[#10B981]/40 hover:bg-[#10B981]/10",
    },
    {
      key: "tiktok",
      url: socials.tiktok,
      label: "TikTok",
      icon: <TiktokIcon />,
      color: "hover:text-[#FB7185] hover:border-[#FB7185]/40 hover:bg-[#FB7185]/10",
    },
    {
      key: "email",
      url: socials.email
        ? socials.email.startsWith("mailto:")
          ? socials.email
          : `mailto:${socials.email}`
        : undefined,
      label: "Email",
      icon: <Mail className="w-3.5 h-3.5" />,
      color: "hover:text-[#10B981] hover:border-[#10B981]/40 hover:bg-[#10B981]/10",
    },
  ];

  // Only keep defined, non-empty social links
  const activeNetworks = networks.filter(
    (n) => n.url && typeof n.url === "string" && n.url.trim().length > 0
  );

  if (activeNetworks.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {activeNetworks.map((net) => (
        <a
          key={net.key}
          href={net.url}
          target={net.key === "email" ? undefined : "_blank"}
          rel={net.key === "email" ? undefined : "noopener noreferrer"}
          aria-label={`${memberName}'s ${net.label}`}
          title={`${memberName} on ${net.label}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl bg-[#161F2E] border border-white/10 text-[#94A3B8] transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.03] active:scale-[0.97]",
            variant === "pill" && "px-3.5 py-2 text-xs font-medium",
            variant === "icon-only" && "p-2.5",
            variant === "compact" && "p-2 text-xs",
            net.color
          )}
        >
          <span className="shrink-0">{net.icon}</span>
          {variant === "pill" && (
            <span className="font-heading font-medium tracking-wide">{net.label}</span>
          )}
        </a>
      ))}
    </div>
  );
}
