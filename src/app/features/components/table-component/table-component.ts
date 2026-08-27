import { CommonModule } from '@angular/common';
import { Component, computed, effect, EventEmitter, input, Input, output, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WorkOrder } from '../../../core/models/work-order.model';

@Component({
  selector: 'app-table-component',
  imports: [    
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    FormsModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {

  workOrders = input<WorkOrder[]>([]);

  onEdit = output<WorkOrder>();
  onDelete = output<string>();

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<WorkOrder>([]);
  displayedColumns: string[] = ['id', 'site', 'region', 'status', 'priority',
    'owner', 'slaDueAt', 'progressPct', 'actions'];

  constructor() {
    effect(() => {
      const orders = this.workOrders() || [];
      const currentFilter = this.filterValue();
      
      this.dataSource.data = orders;
      
      if (currentFilter) {
        this.dataSource.filter = currentFilter.trim().toLowerCase();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.setupFilter();
  }

  private filterValueSignal = signal<string>('');
  filterValue = this.filterValueSignal.asReadonly();

  private setupFilter(): void {
    this.dataSource.filterPredicate = (data: WorkOrder, filter: string) => {
      const searchTerm = filter.toLowerCase();
      return data.site.toLowerCase().includes(searchTerm) ||
        data.owner.toLowerCase().includes(searchTerm) ||
        data.id.toLowerCase().includes(searchTerm);
    };
  }

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.filterValueSignal.set(filterValue);
  this.dataSource.filter = filterValue.trim().toLowerCase();
  
  
  if (!filterValue || filterValue.trim() === '') {
    this.dataSource.filter = '';
    this.dataSource._updateChangeSubscription();
  }
}
  
  isOverdue(slaDueAt: string): boolean {
    return new Date(slaDueAt) < new Date();
  }
}
