import { Component, computed, Input, signal } from '@angular/core';
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

    @Input({ required: true }) set workOrders(value: WorkOrder[]) {
    this.workOrdersSignal.set(value);
  }

  // Use signals for reactivity
  private workOrdersSignal = signal<WorkOrder[]>([]);
  readonly workOrderValue = this.workOrdersSignal.asReadonly();

  // Computed signals
  regionCounts = computed(() => {
    const orders = this.workOrdersSignal();
    return orders.reduce((acc, order) => {
      acc[order.region] = (acc[order.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

  statusCounts = computed(() => {
    const orders = this.workOrdersSignal();
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  });

  getCountByStatus(status: string): number {
    return this.statusCounts()[status] || 0;
  }
}
