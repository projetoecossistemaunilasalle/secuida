import type { ContentMetadata, ReviewMetadata } from '../content/types';

export type EducationResourceContentType =
  | 'article'
  | 'summary'
  | 'external_link'
  | 'pdf_link'
  | 'video_link'
  | 'audio_link';
export type EducationResourceAudience = 'teachers' | 'public_school_teachers' | 'general';

export type EducationResourceFeaturedImage =
  | { kind: 'catalog'; imageId: string }
  | { kind: 'external'; imageUrl: string; alt?: string };

export type EducationResourceBlockKind = 'paragraph' | 'heading' | 'list' | 'image' | 'video' | 'sourceLink';

export interface EducationResourceBlock {
  id: string;
  kind: EducationResourceBlockKind;
  title?: string;
  text?: string;
  items?: string[];
  imageUrl?: string;
  alt?: string;
  url?: string;
  label?: string;
  description?: string;
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
  featuredImage?: EducationResourceFeaturedImage;
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
