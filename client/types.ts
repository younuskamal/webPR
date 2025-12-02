import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details?: string;
  benefits?: string[];
  icon: LucideIcon;
  // New Fields for Detailed Page
  price?: number;
  govtFees?: number;
  duration?: string;
  requirements?: string[];
  conditions?: string[];
}

export interface Package {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  isFeatured: boolean;
  color: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface SiteSettings {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}