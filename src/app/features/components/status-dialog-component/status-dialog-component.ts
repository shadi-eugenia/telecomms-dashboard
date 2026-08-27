import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StatusUpdateData } from '../../../core/models/dialogs.model';


@Component({
  selector: 'app-status-dialog-component',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './status-dialog-component.html',
  styleUrl: './status-dialog-component.scss',
})
export class StatusDialogComponent {

    statusOptions = ['New', 'Planned', 'In Progress', 'Blocked', 'Done'];
  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatusUpdateData
  ) {
    this.statusForm = this.fb.group({
      status: [data.workOrder.status, Validators.required],
      note: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.statusForm.valid) {
      this.dialogRef.close({
        status: this.statusForm.value.status,
        note: this.statusForm.value.note || 'Status updated'
      });
    }
  }
}
