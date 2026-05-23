import type { GuidedFlow } from '../../domain/flow-engine/types';
import type { EducationResource } from '../../domain/resources/types';
import type { DashboardShippedContent } from '../content/shippedContent';

const STORAGE_KEY = 'secuida:dev-dashboard:drafts:v1';
export const DASHBOARD_DRAFT_SCHEMA_VERSION = '1.0.0' as const;

export interface DashboardRecordPatch<T extends { id: string }> {
  id: string;
  patch: Partial<T>;
}

export interface DashboardDraftState {
  schemaVersion: typeof DASHBOARD_DRAFT_SCHEMA_VERSION;
  flowPatches: Array<DashboardRecordPatch<GuidedFlow>>;
  educationMaterialPatches: Array<DashboardRecordPatch<EducationResource>>;
  addedFlows: GuidedFlow[];
  addedEducationMaterials: EducationResource[];
  updatedAt: string | null;
}

export function createEmptyDashboardDraftState(): DashboardDraftState {
  return {
    schemaVersion: DASHBOARD_DRAFT_SCHEMA_VERSION,
    flowPatches: [],
    educationMaterialPatches: [],
    addedFlows: [],
    addedEducationMaterials: [],
    updatedAt: null,
  };
}

export function loadDashboardDrafts(storage: Storage = localStorage): DashboardDraftState {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return createEmptyDashboardDraftState();

  try {
    const parsed = JSON.parse(raw) as DashboardDraftState;
    if (parsed.schemaVersion !== DASHBOARD_DRAFT_SCHEMA_VERSION) return createEmptyDashboardDraftState();
    return parsed;
  } catch {
    return createEmptyDashboardDraftState();
  }
}

export function saveDashboardDrafts(state: DashboardDraftState, storage: Storage = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearDashboardDrafts(storage: Storage = localStorage) {
  storage.removeItem(STORAGE_KEY);
}

export function mergeDashboardDrafts(shipped: DashboardShippedContent, drafts: DashboardDraftState) {
  return {
    flows: mergeRecords(shipped.flows, drafts.flowPatches, drafts.addedFlows),
    educationMaterials: mergeRecords(
      shipped.educationMaterials,
      drafts.educationMaterialPatches,
      drafts.addedEducationMaterials,
    ),
  };
}

function mergeRecords<T extends { id: string }>(shipped: T[], patches: Array<DashboardRecordPatch<T>>, additions: T[]) {
  const patchesById = new Map(patches.map((record) => [record.id, record.patch]));
  return [...shipped.map((record) => ({ ...record, ...patchesById.get(record.id) })), ...additions];
}
