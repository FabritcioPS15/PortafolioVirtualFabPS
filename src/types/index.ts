export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'testing';
  estimatedDate?: string;
  link?: string;
  github?: string;
  category?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
  completionDate?: string;
  progress?: number;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type Theme = 'light' | 'dark';

export type ColorScheme = 'dark-blue' | 'grenadier' | 'forest-green' | 'voodoo' | 'waterloo' | 'wattle';

export type Language = 'es' | 'en';