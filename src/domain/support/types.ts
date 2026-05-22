import type { ContentMetadata, ReviewMetadata } from '../content/types';

export interface SupportContact {
  id: string;
  name: string;
  phoneDisplay: string;
  phoneHref: string;
  description: string;
  review: ReviewMetadata;
}

export interface SupportContactsContent extends ContentMetadata {
  title: string;
  description: string;
  contacts: SupportContact[];
}
