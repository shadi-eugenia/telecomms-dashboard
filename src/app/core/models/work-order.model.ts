export type Region = 'AMER' | 'RSA' | 'BOTS' | 'ZIM' | 'CANADA' | 'BRAZIL';
export type WorkStatus = 'New' | 'Planned' | 'In Progress' | 'Blocked' | 'Done';

export interface WorkOrder {
  id: string;
  site: string;
  region: Region;
  status: WorkStatus;
  priority: number; // 1-5
  owner: string;
  slaDueAt: string; // ISO timestamp
  lastUpdatedAt: string; // ISO timestamp
  progressPct: number; // 0-100
}

export type WorkOrderUpdate = Partial<WorkOrder>;