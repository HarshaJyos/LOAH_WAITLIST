import React from "react";
import { TeamSocials } from "@/types/team";
import { cn } from "@/lib/utils";

// Original Full-Color X / Twitter Icon
function XColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <path
        fill="#F8FAFC"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

// Original Full-Color LinkedIn Icon (Flaticon style)
function LinkedinColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <path
        fill="#0288D1"
        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
      />
      <path
        fill="#FFFFFF"
        d="M12 19h5v17h-5zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 1.485 1.08 1.514 2.499C16.028 15.888 15.006 17 14.485 17zM36 36h-5v-9.057c0-2.164-.78-3.64-2.735-3.64-1.493 0-2.383 1.002-2.774 1.97-.143.348-.179.833-.179 1.319V36h-5s.067-15.426 0-17h5v2.408c.664-1.023 1.85-2.482 4.5-2.482 3.286 0 5.751 2.147 5.751 6.763V36z"
      />
    </svg>
  );
}

// Original Full-Color Instagram Icon (Flaticon style gradient)
function InstagramColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <defs>
        <radialGradient id="instaGrad" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fd5" />
          <stop offset=".328" stopColor="#ff543e" />
          <stop offset=".348" stopColor="#ff5245" />
          <stop offset=".504" stopColor="#e64771" />
          <stop offset=".643" stopColor="#d62e9d" />
          <stop offset=".761" stopColor="#9c36b4" />
          <stop offset=".845" stopColor="#6951be" />
        </radialGradient>
      </defs>
      <path
        fill="url(#instaGrad)"
        d="M34.017 41.99l-20-.019c-4.4 0-7.98-3.58-7.98-7.98V14.01c0-4.4 3.58-7.98 7.98-7.98l20 .019c4.4 0 7.98 3.58 7.98 7.98v19.98c0 4.401-3.58 7.981-7.98 7.981z"
      />
      <path
        fill="#FFFFFF"
        d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-11.5c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5z"
      />
      <circle cx="31.5" cy="16.5" r="1.5" fill="#FFFFFF" />
      <path
        fill="#FFFFFF"
        d="M30 37H18c-3.859 0-7-3.14-7-7V18c0-3.86 3.141-7 7-7h12c3.859 0 7 3.14 7 7v12c0 3.86-3.141 7-7 7zM18 13.5c-2.481 0-4.5 2.019-4.5 4.5v12c0 2.481 2.019 4.5 4.5 4.5h12c2.481 0 4.5-2.019 4.5-4.5V18c0-2.481-2.019-4.5-4.5-4.5H18z"
      />
    </svg>
  );
}

// Original Full-Color YouTube Icon (Flaticon style red badge)
function YoutubeColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
      />
      <path fill="#FFFFFF" d="M20 31L31 24 20 17z" />
    </svg>
  );
}

// Original Full-Color GitHub Icon
function GithubColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6 sm:w-7 sm:h-7 fill-[#F8FAFC]", className)} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// Original Full-Color Threads Icon
function ThreadsColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("w-6 h-6 sm:w-7 sm:h-7 fill-[#F8FAFC]", className)} aria-hidden="true">
      <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.608 0 11.97 5.253 12.18 11.814v.667c0 4.133-2.906 7.234-7.234 7.234-2.484 0-4.66-1.11-5.787-3.048-.063.14-.143.276-.232.404-.764 1.106-2.023 1.776-3.374 1.776-2.316 0-4.198-1.882-4.198-4.198 0-2.315 1.882-4.197 4.198-4.197 1.351 0 2.61.67 3.374 1.776.089.128.169.264.232.404.996-1.706 2.894-2.673 4.987-2.673 3.036 0 5.034 2.146 5.034 5.127 0 .044 0 .089-.001.134-1.127-.271-2.416-.42-3.791-.42-4.475 0-7.397 2.474-7.397 5.86 0 3.238 2.645 5.567 6.136 5.567 2.84 0 5.195-1.575 6.07-4.004.839 2.43 3.195 4.004 6.035 4.004z" />
    </svg>
  );
}

// Original Full-Color TikTok Icon (Flaticon style)
function TiktokColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#111827" />
      <path
        fill="#25F4EE"
        d="M30.5 14.5c1.8 1.3 3.9 2.1 6.2 2.2v4.1c-2.3-.1-4.4-.9-6.2-2.2v10.7c0 4.6-3.7 8.3-8.3 8.3-2.7 0-5.1-1.3-6.6-3.3 1.2.3 2.5.2 3.6-.3 2.1-1 3.5-3.1 3.5-5.6 0-3.4-2.8-6.2-6.2-6.2-.8 0-1.6.2-2.3.5.5-3.7 3.7-6.5 7.5-6.5.9 0 1.7.2 2.5.5V11.2h4.5v3.3z"
        opacity="0.9"
      />
      <path
        fill="#FE2C55"
        d="M28.5 12.5c1.8 1.3 3.9 2.1 6.2 2.2v4.1c-2.3-.1-4.4-.9-6.2-2.2v10.7c0 4.6-3.7 8.3-8.3 8.3-2.7 0-5.1-1.3-6.6-3.3 1.2.3 2.5.2 3.6-.3 2.1-1 3.5-3.1 3.5-5.6 0-3.4-2.8-6.2-6.2-6.2-.8 0-1.6.2-2.3.5.5-3.7 3.7-6.5 7.5-6.5.9 0 1.7.2 2.5.5V9.2h4.5v3.3z"
        opacity="0.9"
      />
      <path
        fill="#FFFFFF"
        d="M29.5 13.5c1.8 1.3 3.9 2.1 6.2 2.2v4.1c-2.3-.1-4.4-.9-6.2-2.2v10.7c0 4.6-3.7 8.3-8.3 8.3-2.7 0-5.1-1.3-6.6-3.3 1.2.3 2.5.2 3.6-.3 2.1-1 3.5-3.1 3.5-5.6 0-3.4-2.8-6.2-6.2-6.2-.8 0-1.6.2-2.3.5.5-3.7 3.7-6.5 7.5-6.5.9 0 1.7.2 2.5.5V10.2h4.5v3.3z"
      />
    </svg>
  );
}

// Original Full-Color Email / Gmail Icon (Flaticon style)
function EmailColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
      <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L6.67,6.452C5.102,5.275,3,6.393,3,8.349V12.298z" />
      <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l6.33-4.748C42.898,5.275,45,6.393,45,8.349V12.298z" />
    </svg>
  );
}

// Original Full-Color Website / Globe Icon (Flaticon style)
function GlobeColorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("w-6 h-6 sm:w-7 sm:h-7", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="#0288D1" />
      <path fill="#81C784" d="M38.5 13.5c-2.3-2.1-5.8-3.4-9.5-3.5-3.6 1.8-6.1 5.4-6.8 9.5 2.1 1.7 4.8 2.8 7.8 2.8 4.2 0 7.9-2.1 10.1-5.3-.5-1.3-.9-2.5-1.6-3.5z" />
      <path fill="#66BB6A" d="M17 30c0 4.4 2.2 8.3 5.6 10.6.5-1.8 1.4-3.5 2.6-4.9-1.9-1.3-4.2-2.1-6.7-2.3-.5-1.1-.9-2.2-1.5-3.4z" />
      <circle cx="24" cy="24" r="20" fill="none" stroke="#E0F2FE" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

export interface TeamSocialLinksProps {
  socials?: TeamSocials;
  memberName?: string;
  className?: string;
}

export function TeamSocialLinks({
  socials,
  memberName = "Team Member",
  className,
}: TeamSocialLinksProps) {
  if (!socials) return null;

  // Registry of all social networks with authentic full-color Flaticon-style SVGs
  const networks = [
    {
      key: "twitter",
      url: socials.twitter || socials.x,
      label: "X (Twitter)",
      icon: <XColorIcon />,
    },
    {
      key: "linkedin",
      url: socials.linkedin,
      label: "LinkedIn",
      icon: <LinkedinColorIcon />,
    },
    {
      key: "instagram",
      url: socials.instagram,
      label: "Instagram",
      icon: <InstagramColorIcon />,
    },
    {
      key: "youtube",
      url: socials.youtube,
      label: "YouTube",
      icon: <YoutubeColorIcon />,
    },
    {
      key: "github",
      url: socials.github,
      label: "GitHub",
      icon: <GithubColorIcon />,
    },
    {
      key: "threads",
      url: socials.threads,
      label: "Threads",
      icon: <ThreadsColorIcon />,
    },
    {
      key: "website",
      url: socials.website,
      label: "Personal Website",
      icon: <GlobeColorIcon />,
    },
    {
      key: "tiktok",
      url: socials.tiktok,
      label: "TikTok",
      icon: <TiktokColorIcon />,
    },
    {
      key: "email",
      url: socials.email
        ? socials.email.startsWith("mailto:")
          ? socials.email
          : `mailto:${socials.email}`
        : undefined,
      label: "Email",
      icon: <EmailColorIcon />,
    },
  ];

  // Filter valid active links
  const activeNetworks = networks.filter(
    (n) => n.url && typeof n.url === "string" && n.url.trim().length > 0
  );

  if (activeNetworks.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3.5 sm:gap-4", className)}>
      {activeNetworks.map((net) => (
        <a
          key={net.key}
          href={net.url}
          target={net.key === "email" ? undefined : "_blank"}
          rel={net.key === "email" ? undefined : "noopener noreferrer"}
          aria-label={`${memberName}'s ${net.label}`}
          title={`${memberName} on ${net.label}`}
          className="inline-flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 active:scale-95 shrink-0 opacity-90 hover:opacity-100 drop-shadow-sm hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          {net.icon}
        </a>
      ))}
    </div>
  );
}
