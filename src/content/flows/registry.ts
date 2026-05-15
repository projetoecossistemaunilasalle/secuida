import type { ContentMetadata } from '../../domain/content/types';

export const flowRegistry = {
  id: 'flow-registry',
  version: '0.1.0',
  status: 'draft',
  locale: 'pt-BR',
  flows: [],
  note: 'Placeholder only. The full guided-flow schema and runtime belong to Front 05.',
} satisfies ContentMetadata & { flows: unknown[]; note: string };

