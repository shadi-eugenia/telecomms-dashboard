import { Component, computed, input, Input, signal } from '@angular/core';
import { WorkOrder } from '../../../core/models/work-order.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-cards-component',
  imports: [CommonModule, MatCardModule],
  templateUrl: './summary-cards-component.html',
  styleUrl: './summary-cards-component.scss',
})
export class SummaryCardsComponent {
  readonly workOrders = input<WorkOrder[]>([]);


  regionCounts = computed(() => {
    const orders = this.workOrders();
    return orders.reduce((acc, order) => {
      acc[order.region] = (acc[order.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

  statusCounts = computed(() => {
    const orders = this.workOrders();
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

  getCountByStatus(status: string): number {
    return this.statusCounts()[status] || 0;
  }
}
