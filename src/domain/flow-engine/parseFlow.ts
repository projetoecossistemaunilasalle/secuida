import type { GuidedFlow } from './types';
import { validateFlow } from './validateFlow';

export function parseGuidedFlow(flow: unknown): GuidedFlow {
  const validation = validateFlow(flow);

  if (!validation.valid) {
    throw new Error(validation.errors.join(' '));
  }

  return flow as GuidedFlow;
}
