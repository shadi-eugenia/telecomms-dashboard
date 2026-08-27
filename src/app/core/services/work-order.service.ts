import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { WorkOrder, WorkOrderUpdate } from '../models/work-order.model';

@Injectable({
  providedIn: 'root',
})
export class WorkOrderService {
    private apiUrl = 'api/work-orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, changes: WorkOrderUpdate): Observable<WorkOrder> {
    // First get the current order, merge changes, then PUT
    return this.getById(id).pipe(
      switchMap(current => {
        const updated = {
          ...current,
          ...changes,
          lastUpdatedAt: new Date().toISOString()
        };
        return this.http.put<WorkOrder>(`${this.apiUrl}/${id}`, updated);
      }),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    const message = error.status === 0
      ? 'Network error. Please check your connection.'
      : `Error: ${error.status} - ${error.message || 'Something went wrong'}`;
    return throwError(() => new Error(message));
  }
}
