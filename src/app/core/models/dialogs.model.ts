import { WorkOrder } from "./work-order.model";

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface ConfirmDialogResult {
  confirmed: boolean;
}

export interface StatusUpdateData {
  workOrder: WorkOrder;
}

export interface StatusUpdateResult {
  status: string;
  note: string;
}