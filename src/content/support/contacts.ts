import type { SupportContactsContent } from '../../domain/support/types';

const pendingReview = {
  status: 'pending_review',
  reviewedBy: null,
  reviewedAt: null,
  notes: '',
} as const;

export const supportContacts = {
  id: 'support-contacts',
  version: '0.1.0',
  status: 'draft',
  locale: 'pt-BR',
  title: 'Voce nao esta sozinho(a).',
  description: 'Se voce estiver em sofrimento agora, estas pessoas podem te ajudar.',
  contacts: [
    {
      id: 'support-cvv',
      name: 'CVV',
      phoneDisplay: '188',
      phoneHref: 'tel:188',
      description: 'Centro de Valorizacao da Vida. Atendimento 24h, gratuito e sigiloso para apoio emocional e prevencao ao suicidio.',
      review: pendingReview,
    },
    {
      id: 'support-samu',
      name: 'SAMU',
      phoneDisplay: '192',
      phoneHref: 'tel:192',
      description: 'Servico de Atendimento Movel de Urgencia. Para emergencias medicas que necessitem de intervencao imediata.',
      review: pendingReview,
    },
    {
      id: 'support-bombeiros',
      name: 'Bombeiros',
      phoneDisplay: '193',
      phoneHref: 'tel:193',
      description: 'Corpo de Bombeiros. Para resgates, tentativas de suicidio em andamento ou situacoes de risco iminente a vida.',
      review: pendingReview,
    },
  ],
} satisfies SupportContactsContent;

