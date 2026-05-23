import type { ContentMetadata, ReviewMetadata } from '../content/types';

export type EducationResourceContentType =
  | 'article'
  | 'summary'
  | 'external_link'
  | 'pdf_link'
  | 'video_link'
  | 'audio_link';
export type EducationResourceAudience = 'teachers' | 'public_school_teachers' | 'general';

export interface EducationResourceBlock {
  id: string;
  kind: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

export interface EducationResourceEmbed {
  provider: 'youtube' | 'external';
  url: string;
}

export interface EducationResource {
  id: string;
  title: string;
  source: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  audience: EducationResourceAudience;
  contentType: EducationResourceContentType;
  body?: EducationResourceBlock[];
  externalUrl?: string;
  embed?: EducationResourceEmbed;
  href?: string;
  review: ReviewMetadata;
}

export interface ResourcesContent extends ContentMetadata {
  resources: EducationResource[];
}
