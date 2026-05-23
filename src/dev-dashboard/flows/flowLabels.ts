import type { FlowPurpose } from '../../domain/flow-engine/types';

export const flowPurposeLabels: Record<'common' | FlowPurpose, string> = {
  common: 'Conversa principal: começa quando a pessoa digita ou escolhe uma frase',
  orientation_entry: 'Entrada da orientação: começa em um botão da tela inicial',
  post_flow_routing: 'Roteamento neutro: sugere o próximo caminho depois de um fluxo',
};
