import { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    slug: "pavan-duggirala",
    name: "Pavan Duggirala",
    role: "Product & Community Lead",
    avatar: "/avatars/pavan.jpg",
    shortBio: "Product strategist living with ADHD, exploring calm, zero-friction externalization systems.",
    location: "Global / Remote",
    story: [
      "After years of wrestling with twenty half-finished pages across Apple Notes, Notion, and Obsidian, Pavan realized that traditional productivity software forces ADHD brains to organize at the exact moment of capture—causing working memory to spill and initiation to fail.",
      "At LOAH, Pavan leads product strategy and community engagement, designing zero-activation-energy tools that let users dump thoughts instantly and sort only when executive energy returns.",
      "His writing focuses on breaking the cycle of productivity shame and engineering software that respects neurodivergent cognitive limits.",
    ],
    focusAreas: [
      "Zero-Activation Capture",
      "ADHD Cognitive Support",
      "Calm Software Architecture",
      "Community & Build Logs",
    ],
    socials: {
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      github: "https://github.com",
      email: "pavan@loah.app",
    },
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}
