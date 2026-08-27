import { Injectable } from '@angular/core';
import { WorkOrder, Region, WorkStatus } from '../models/work-order.model';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  createDb(): { 'work-orders': WorkOrder[] } {
    const workOrders = this.generateWorkOrders(500);
    return { 'work-orders': workOrders };
  }

  private generateWorkOrders(count: number): WorkOrder[] {
    const regions: Region[] = ['AMER', 'RSA', 'BOTS', 'ZIM', 'CANADA', 'BRAZIL'];
    const statuses: WorkStatus[] = ['New', 'Planned', 'In Progress', 'Blocked', 'Done'];
    const owners = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross', 'Eve Adams',
      'Frank Lee', 'Grace Kim', 'Henry Chen', 'Ivy Patel', 'Jack Wilson'];
    const sites = ['Site-A', 'Site-B', 'Site-C', 'Site-D', 'Site-E', 'Site-F', 'Site-G', 'Site-H', 'Site-I', 'Site-J'];

    return Array.from({ length: count }, (_, index) => {
      const id = `WO2026${String(index + 1).padStart(4, '0')}`;
      const site = `${sites[Math.floor(Math.random() * sites.length)]}${Math.floor(Math.random() * 1000)}`;
      const region = regions[Math.floor(Math.random() * regions.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority = Math.floor(Math.random() * 5) + 1;
      const owner = owners[Math.floor(Math.random() * owners.length)];

      // SLA due date: 7-60 days from now
      const slaDays = Math.floor(Math.random() * 53) + 7;
      const slaDueAt = new Date(Date.now() + slaDays * 86400000).toISOString();

      // Last updated: 0-30 days ago
      const lastUpdatedDays = Math.floor(Math.random() * 30);
      const lastUpdatedAt = new Date(Date.now() - lastUpdatedDays * 86400000).toISOString();

      const progressPct = Math.floor(Math.random() * 101);

      return {
        id,
        site,
        region,
        status,
        priority,
        owner,
        slaDueAt,
        lastUpdatedAt,
        progressPct
      };
    });
  }
}
