import type { FlowNode, GuidedFlow } from '../../domain/flow-engine/types';

export function getFlowNodeTitle(nodeId: string, nodes: FlowNode[]) {
  const index = nodes.findIndex((node) => node.id === nodeId);
  return index === -1 ? 'Etapa sem nome' : `Etapa ${index + 1}`;
}

export function getFlowNodeLabel(node: FlowNode, nodes: FlowNode[]) {
  const preview = node.text.trim().replace(/\s+/g, ' ').slice(0, 64);
  return `${getFlowNodeTitle(node.id, nodes)} - ${preview}`;
}

export function getFlowStartTargetTitle(flowId: string, flows: GuidedFlow[]) {
  return flows.find((flow) => flow.id === flowId)?.title ?? 'outro fluxo';
}
