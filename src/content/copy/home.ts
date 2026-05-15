import type { HomeCopy } from '../../domain/copy/types';

export const homeCopy = {
  id: 'home-copy',
  version: '0.1.0',
  status: 'draft',
  locale: 'pt-BR',
  title: 'Como voce esta hoje?',
  subtitle: 'Um espaco de orientacao emocional para educadores, feito para acolher, informar e conectar sem identificar voce.',
  privacyReassurance: 'Este e um espaco seguro. O SeCuida nao pede login, CPF, email ou escola. O que voce fizer aqui nao e salvo entre sessoes.',
  howItWorksTitle: 'Como funciona',
  howItWorksItems: [
    'Voce escolhe um caminho de apoio no seu tempo.',
    'A orientacao e guiada por opcoes predefinidas, nao por IA livre.',
    'Quando fizer sentido, indicamos recursos e contatos de apoio.',
  ],
  actions: [
    {
      id: 'immediate-support',
      label: 'Nao estou bem agora',
      description: 'Acesse contatos imediatos e um primeiro cuidado de regulacao.',
    },
    {
      id: 'guided-orientation',
      label: 'Preciso de orientacao',
      description: 'Converse por um fluxo guiado para organizar o que voce sente.',
    },
    {
      id: 'professional-support',
      label: 'Ver rede de apoio local',
      description: 'Encontre servicos de apoio profissional e comunitario.',
    },
  ],
} satisfies HomeCopy;

