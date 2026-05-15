import type { ResourcesContent } from '../../domain/resources/types';

const pendingReview = {
  status: 'pending_review',
  reviewedBy: null,
  reviewedAt: null,
  notes: '',
} as const;

export const resourcesContent = {
  id: 'education-resources',
  version: '0.1.0',
  status: 'draft',
  locale: 'pt-BR',
  resources: [
    {
      id: 'teacher-emotional-regulation-classroom',
      title: 'Guia Pratico de Regulacao Emocional em Sala de Aula',
      source: 'FEEVALE',
      description:
        'Descubra estrategias praticas e acessiveis para lidar com a sobrecarga diaria e gerenciar o estresse no ambiente escolar. Este material foi desenvolvido com foco no acolhimento e na preservacao da saude mental do professor.',
      tags: ['regulacao-emocional', 'sala-de-aula', 'professores'],
      review: pendingReview,
    },
  ],
} satisfies ResourcesContent;

export const featuredOrientationResource = resourcesContent.resources[0];

