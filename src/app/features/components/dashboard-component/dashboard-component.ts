import { Component, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkOrder } from '../../../core/models/work-order.model';
import { WorkOrderService } from '../../../core/services/work-order.service';
import { StatusDialogComponent} from '../status-dialog-component/status-dialog-component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableComponent } from '../table-component/table-component';
import { SummaryCardsComponent } from '../summary-cards-component/summary-cards-component';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component';
import { ConfirmDialogData, StatusUpdateData } from '../../../core/models/dialogs.model';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    SummaryCardsComponent,
    TableComponent
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {

  workOrders = signal<WorkOrder[]>([]);
  loading = signal<boolean>(false);

  constructor(
    private workOrderService: WorkOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  loadWorkOrders(): void {
    this.loading.set(true);
    this.workOrderService.getAll().subscribe({
      next: (data) => {
        this.workOrders.set(data);
        this.loading.set(false);
        this.showMessage(`Loaded ${data.length} work orders`);
      },
      error: (error) => {
        this.loading.set(false);
        this.showMessage('Failed to load work orders: ' + error.message, true);
      }
    });
  }

  handleEdit(workOrder: WorkOrder): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      width: '500px',
      data: { workOrder } as StatusUpdateData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateWorkOrderStatus(workOrder.id, result.status);
      }
    });
  }

  handleDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Work Order',
        message: 'Are you sure you want to delete this work order? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDelete(id);
      }
    });
  }

    private performDelete(id: string): void {
    this.loading.set(true);
    this.workOrderService.delete(id).subscribe({
      next: () => {
        this.loading.set(false);
        this.showMessage('Work order deleted successfully');
        this.loadWorkOrders();
      },
      error: (error) => {
        this.loading.set(false);
        this.showMessage('Failed to delete work order: ' + error.message, true);
      }
    });
  }

  updateWorkOrderStatus(id: string, newStatus: string): void {
    this.loading.set(true);
    this.workOrderService.update(id, { status: newStatus as any }).subscribe({
      next: (updated) => {
        this.loading.set(false);
        this.showMessage(`Status updated to "${newStatus}" successfully`);
        this.loadWorkOrders(); // Refresh to show updated data
      },
      error: (error) => {
        this.loading.set(false);
        this.showMessage('Failed to update status: ' + error.message, true);
      }
    });
  }

  private showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'Close', {
      duration: isError ? 5000 : 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
