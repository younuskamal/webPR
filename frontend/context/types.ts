import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  details?: string;
  benefits?: string[];
  icon: any; // Stored as component or string name in DB context
  price?: number;
  govtFees?: number;
  duration?: string;
  requirements?: string[];
  conditions?: string[];
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
