import type { ChoiceFlowNode, FlowNode, GuidedFlow } from '../../domain/flow-engine/types';
import { getFlowNodeTitle, getFlowStartTargetTitle } from './flowDisplay';

export function FlowMap({ flow, flows }: { flow: GuidedFlow; flows: GuidedFlow[] }) {
  const nodes = Object.values(flow.nodes);

  return (
    <section className="flex flex-col gap-stack-sm rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5">
      <h2 className="font-headline-sm text-on-surface">Mapa visual</h2>
      <p className="font-body-md text-on-surface-variant">
        Visão rápida de cada etapa e para onde cada resposta leva a conversa.
      </p>
      <div className="flex flex-col gap-3">
        {nodes.map((node) => (
          <article key={node.id} className="rounded-lg border border-outline-variant bg-surface-container-low p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-label-lg text-on-surface">{getFlowNodeTitle(node.id, nodes)}</p>
                <p className="mt-1 max-w-3xl font-body-md text-on-surface-variant">{node.text}</p>
              </div>
              <span className="rounded-full bg-surface px-3 py-1 font-label-sm text-on-surface-variant">
                {node.kind === 'choice' ? 'Escolha' : 'Final'}
              </span>
            </div>
            {node.kind === 'choice' && (
              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {node.options.map((option) => (
                  <li
                    key={option.id}
                    className="rounded-lg border border-outline-variant/60 bg-surface-container-lowest p-3"
                  >
                    <p className="font-label-md text-on-surface">Se escolher "{option.label}"</p>
                    <p className="mt-1 font-body-md text-on-surface-variant">
                      {getOptionDestinationLabel(option, flows, nodes)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function getOptionDestinationLabel(option: ChoiceFlowNode['options'][number], flows: GuidedFlow[], nodes: FlowNode[]) {
  const flowStart = option.effects?.find((effect) => effect.kind === 'flow_start');

  if (flowStart) {
    return `começa o fluxo "${getFlowStartTargetTitle(flowStart.flowId, flows)}"`;
  }

  return `vai para ${getFlowNodeTitle(option.next, nodes)}`;
}
