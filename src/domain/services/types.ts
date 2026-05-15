import type { ContentMetadata, ReviewMetadata } from '../content/types';

export interface ServiceDirectoryEntry {
  id: string;
  name: string;
  type: string;
  badgeTone: 'primary' | 'secondary' | 'neutral';
  city: string;
  state: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  hours?: string;
  notes?: string;
  review: ReviewMetadata;
}

export interface ServicesContent extends ContentMetadata {
  title: string;
  description: string;
  services: ServiceDirectoryEntry[];
}

