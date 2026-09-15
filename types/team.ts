export interface TeamSocials {
  twitter?: string;
  x?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  website?: string;
  threads?: string;
  bluesky?: string;
  tiktok?: string;
  email?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  shortBio: string;
  story: string[];
  focusAreas: string[];
  location?: string;
  socials?: TeamSocials;
}
