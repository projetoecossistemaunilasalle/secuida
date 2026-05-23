import type { ChoiceFlowNode, FlowNode, GuidedFlow } from '../../domain/flow-engine/types';
import { FieldHint } from '../components/FieldHint';
import { getFlowNodeLabel, getFlowNodeTitle } from './flowDisplay';
import { flowPurposeLabels } from './flowLabels';

export function FlowEditor({
  flow,
  flows,
  onChange,
}: {
  flow: GuidedFlow;
  flows: GuidedFlow[];
  onChange: (patch: Partial<GuidedFlow>) => void;
}) {
  const nodes = Object.values(flow.nodes);
  const firstNodeId = nodes[0]?.id ?? flow.entry.nodeId;

  function updateEntry(patch: Partial<GuidedFlow['entry']>) {
    onChange({ entry: { ...flow.entry, ...patch } });
  }

  function updateEnteringPhrase(index: number, value: string) {
    updateEntry({
      enteringPhrases: flow.entry.enteringPhrases.map((phrase, phraseIndex) =>
        phraseIndex === index ? value : phrase,
      ),
    });
  }

  function addEnteringPhrase() {
    updateEntry({ enteringPhrases: [...flow.entry.enteringPhrases, 'Nova frase'] });
  }

  function updateNode(nodeId: string, patch: Partial<FlowNode>) {
    onChange({
      nodes: {
        ...flow.nodes,
        [nodeId]: { ...flow.nodes[nodeId], ...patch } as FlowNode,
      },
    });
  }

  function updateChoiceOption(
    node: ChoiceFlowNode,
    optionId: string,
    patch: Partial<ChoiceFlowNode['options'][number]>,
  ) {
    updateNode(node.id, {
      options: node.options.map((option) => (option.id === optionId ? { ...option, ...patch } : option)),
    });
  }

  function addResultNode() {
    const nodeId = createUniqueId('nova_etapa', flow.nodes);
    onChange({
      nodes: {
        ...flow.nodes,
        [nodeId]: {
          id: nodeId,
          kind: 'result',
          text: 'Nova etapa final.',
        },
      },
    });
  }

  function addOption(node: ChoiceFlowNode) {
    const optionId = createUniqueId(
      'nova_opcao',
      Object.fromEntries(node.options.map((option) => [option.id, option])),
    );
    updateNode(node.id, {
      options: [
        ...node.options,
        {
          id: optionId,
          label: 'Nova opção',
          next: firstNodeId,
        },
      ],
    });
  }

  return (
    <section className="flex flex-col gap-stack-sm rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5">
      <h2 className="font-headline-sm text-on-surface">Dados do fluxo</h2>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface">Título do fluxo</span>
        <input
          aria-label="Título do fluxo"
          className="min-h-11 rounded-lg border border-outline-variant bg-surface px-3"
          value={flow.title}
          onChange={(event) => onChange({ title: event.target.value })}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface">Uso do fluxo</span>
        <select
          className="min-h-11 rounded-lg border border-outline-variant bg-surface px-3"
          value={flow.purpose ?? 'common'}
          onChange={(event) =>
            onChange({
              purpose: event.target.value === 'common' ? undefined : (event.target.value as GuidedFlow['purpose']),
            })
          }
        >
          <option value="common">{flowPurposeLabels.common}</option>
          <option value="orientation_entry">{flowPurposeLabels.orientation_entry}</option>
          <option value="post_flow_routing">{flowPurposeLabels.post_flow_routing}</option>
        </select>
        <FieldHint>Define onde este fluxo aparece no app e como ele pode ser iniciado.</FieldHint>
      </label>

      <div className="flex flex-col gap-2">
        <h3 className="font-headline-sm text-on-surface">Frases de entrada</h3>
        <FieldHint>São frases que uma pessoa pode escolher para começar este fluxo.</FieldHint>
        <ul className="flex flex-col gap-3">
          {flow.entry.enteringPhrases.map((phrase, phraseIndex) => (
            <li key={`${phrase}-${phraseIndex}`} className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface" htmlFor={`entry-phrase-${phraseIndex}`}>
                Frase de entrada {phraseIndex + 1}
              </label>
              <textarea
                id={`entry-phrase-${phraseIndex}`}
                aria-label={`Frase de entrada ${phraseIndex + 1}`}
                className="min-h-20 rounded-lg border border-outline-variant bg-surface px-3 py-2"
                value={phrase}
                onChange={(event) => updateEnteringPhrase(phraseIndex, event.target.value)}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addEnteringPhrase}
          className="min-h-11 w-fit rounded-full bg-secondary-container px-4 font-label-md text-on-secondary-container"
        >
          Adicionar frase de entrada
        </button>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface">Mensagem antes do fluxo</span>
        <textarea
          aria-label="Mensagem antes do fluxo"
          className="min-h-20 rounded-lg border border-outline-variant bg-surface px-3 py-2"
          value={flow.entry.transitionMessage}
          onChange={(event) => updateEntry({ transitionMessage: event.target.value })}
        />
        <FieldHint>Aparece no chat logo antes da primeira etapa, quando o app está abrindo este fluxo.</FieldHint>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-on-surface">Primeira etapa</span>
        <select
          aria-label="Primeira etapa"
          className="min-h-11 rounded-lg border border-outline-variant bg-surface px-3"
          value={flow.entry.nodeId}
          onChange={(event) => updateEntry({ nodeId: event.target.value })}
        >
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {getFlowNodeLabel(node, nodes)}
            </option>
          ))}
        </select>
        <FieldHint>
          Escolha qual etapa aparece primeiro para a pessoa. Os códigos técnicos ficam escondidos aqui.
        </FieldHint>
      </label>

      <section className="flex flex-col gap-stack-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-headline-sm text-on-surface">Etapas</h3>
          <button
            type="button"
            onClick={addResultNode}
            className="min-h-11 rounded-full bg-secondary-container px-4 font-label-md text-on-secondary-container"
          >
            Adicionar etapa final
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {nodes.map((node) => (
            <article key={node.id} className="flex flex-col gap-3 rounded-lg border border-outline-variant p-3">
              <h4 className="font-label-lg text-on-surface">{getFlowNodeTitle(node.id, nodes)}</h4>
              <label className="flex flex-col gap-2">
                <span className="font-label-sm text-on-surface">Texto da etapa</span>
                <textarea
                  aria-label={`Texto da ${getFlowNodeTitle(node.id, nodes).toLowerCase()}`}
                  className="min-h-20 rounded-lg border border-outline-variant bg-surface px-3 py-2"
                  value={node.text}
                  onChange={(event) => updateNode(node.id, { text: event.target.value })}
                />
              </label>

              {node.kind === 'choice' && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-label-md text-on-surface">Opções</p>
                    <button
                      type="button"
                      onClick={() => addOption(node)}
                      className="min-h-10 rounded-full bg-secondary-container px-3 font-label-md text-on-secondary-container"
                    >
                      Adicionar opção nesta etapa
                    </button>
                  </div>
                  {node.options.map((option, optionIndex) => (
                    <div key={option.id} className="grid gap-2 rounded-lg bg-surface-container-low p-3 md:grid-cols-3">
                      <label className="flex flex-col gap-1">
                        <span className="font-label-sm text-on-surface">Texto da opção</span>
                        <input
                          aria-label={`Texto da opção ${optionIndex + 1}`}
                          className="min-h-10 rounded-lg border border-outline-variant bg-surface px-3"
                          value={option.label}
                          onChange={(event) => updateChoiceOption(node, option.id, { label: event.target.value })}
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="font-label-sm text-on-surface">Ação</span>
                        <select
                          aria-label={`Ação da opção ${optionIndex + 1}`}
                          className="min-h-10 rounded-lg border border-outline-variant bg-surface px-3"
                          value={option.effects?.some((effect) => effect.kind === 'flow_start') ? 'flow_start' : 'next'}
                          onChange={(event) => {
                            const otherEffects = option.effects?.filter((effect) => effect.kind !== 'flow_start');

                            if (event.target.value === 'flow_start') {
                              updateChoiceOption(node, option.id, {
                                effects: [
                                  ...(otherEffects ?? []),
                                  {
                                    kind: 'flow_start',
                                    flowId: flows.find((item) => item.id !== flow.id)?.id ?? flow.id,
                                  },
                                ],
                              });
                              return;
                            }

                            updateChoiceOption(node, option.id, {
                              effects: otherEffects?.length ? otherEffects : undefined,
                            });
                          }}
                        >
                          <option value="next">Ir para etapa</option>
                          <option value="flow_start">Começar outro fluxo</option>
                        </select>
                      </label>
                      {option.effects?.some((effect) => effect.kind === 'flow_start') ? (
                        <label className="flex flex-col gap-1">
                          <span className="font-label-sm text-on-surface">Fluxo de destino</span>
                          <select
                            aria-label={`Fluxo de destino da opção ${optionIndex + 1}`}
                            className="min-h-10 rounded-lg border border-outline-variant bg-surface px-3"
                            value={option.effects.find((effect) => effect.kind === 'flow_start')?.flowId ?? flow.id}
                            onChange={(event) =>
                              updateChoiceOption(node, option.id, {
                                effects: [
                                  ...(option.effects?.filter((effect) => effect.kind !== 'flow_start') ?? []),
                                  { kind: 'flow_start', flowId: event.target.value },
                                ],
                              })
                            }
                          >
                            {flows.map((targetFlow) => (
                              <option key={targetFlow.id} value={targetFlow.id}>
                                {targetFlow.title}
                              </option>
                            ))}
                          </select>
                        </label>
                      ) : (
                        <label className="flex flex-col gap-1">
                          <span className="font-label-sm text-on-surface">Próxima etapa</span>
                          <select
                            aria-label={`Próxima etapa da opção ${optionIndex + 1}`}
                            className="min-h-10 rounded-lg border border-outline-variant bg-surface px-3"
                            value={option.next}
                            onChange={(event) => updateChoiceOption(node, option.id, { next: event.target.value })}
                          >
                            {nodes.map((targetNode) => (
                              <option key={targetNode.id} value={targetNode.id}>
                                {getFlowNodeLabel(targetNode, nodes)}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function createUniqueId(baseId: string, records: Record<string, unknown>) {
  if (!records[baseId]) return baseId;

  let index = 2;
  while (records[`${baseId}_${index}`]) index += 1;
  return `${baseId}_${index}`;
}
