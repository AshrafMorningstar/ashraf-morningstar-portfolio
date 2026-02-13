export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  techStack: string[];
  repoUrl?: string;
  stars?: number;
  forks?: number;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  description: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  company?: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon: string;
  link?: string;
}

export type FilterType = 'All' | 'Full-Stack' | 'Systems' | 'Security' | 'Open Source';