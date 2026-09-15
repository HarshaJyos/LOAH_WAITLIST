export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  shortBio: string;
  story: string[];
  focusAreas: string[];
  location?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
}
