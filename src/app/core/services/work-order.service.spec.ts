import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WorkOrderService } from './work-order.service';
import { WorkOrder } from '../models/work-order.model';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';

describe('WorkOrderService', () => {
  let service: WorkOrderService;
  let httpMock: HttpTestingController;
  const apiUrl = 'api/work-orders';

  const mockWorkOrders: WorkOrder[] = [
    {
      id: 'WO202600001',
      site: 'Site-A123',
      region: 'AMER',
      status: 'New',
      priority: 3,
      owner: 'Alice Johnson',
      slaDueAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      progressPct: 50
    },
    {
      id: 'WO202600002',
      site: 'Site-B456',
      region: 'RSA',
      status: 'In Progress',
      priority: 1,
      owner: 'Bob Smith',
      slaDueAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      progressPct: 75
    }
  ];

  const mockWorkOrder: WorkOrder = mockWorkOrders[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkOrderService, provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(WorkOrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAll', () => {
    it('should return all work orders', () => {
      let result: WorkOrder[] = [];

      service.getAll().subscribe((data) => {
        result = data;
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockWorkOrders);

      expect(result).toEqual(mockWorkOrders);
      expect(result.length).toBe(2);
    });

    it('should handle HTTP error when fetching all work orders', () => {
      let errorMessage = '';

      service.getAll().subscribe({
        error: (error) => {
          errorMessage = error.message;
        }
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorMessage).toContain('500');
    });
  });

  describe('#getById', () => {
    it('should return a single work order by ID', () => {
      const id = 'WO202600001';
      let result: WorkOrder | undefined;

      service.getById(id).subscribe((data) => {
        result = data;
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockWorkOrder);

      expect(result).toEqual(mockWorkOrder);
      expect(result?.id).toBe(id);
    });

    it('should handle 404 when work order not found', () => {
      const id = 'WO999999999';
      let errorMessage = '';

      service.getById(id).subscribe({
        error: (error) => {
          errorMessage = error.message;
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });

      expect(errorMessage).toContain('404');
    });
  });

  describe('#update', () => {
    it('should update a work order successfully', () => {
      const id = 'WO202600001';
      const changes = { status: 'Done' as const };
      const updatedOrder = { ...mockWorkOrder, ...changes };
      let result: WorkOrder | undefined;

      service.update(id, changes).subscribe((data) => {
        result = data;
      });

      const getReq = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(getReq.request.method).toBe('GET');
      getReq.flush(mockWorkOrder);

      const putReq = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(putReq.request.method).toBe('PUT');
      expect(putReq.request.body.status).toBe('Done');
      expect(putReq.request.body.id).toBe(id);
      putReq.flush(updatedOrder);

      expect(result?.status).toBe('Done');
      expect(result?.id).toBe(id);
    });

    it('should handle error when updating fails', () => {
      const id = 'WO202600001';
      const changes = { status: 'Done' as const };
      let errorMessage = '';

      service.update(id, changes).subscribe({
        error: (error) => {
          errorMessage = error.message;
        }
      });

      const getReq = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(getReq.request.method).toBe('GET');
      getReq.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorMessage).toContain('500');
    });
  });

  describe('#delete', () => {
    it('should delete a work order successfully', () => {
      const id = 'WO202600001';
      let completed = false;

      service.delete(id).subscribe({
        complete: () => {
          completed = true;
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      expect(completed).toBeTrue();
    });

    it('should handle error when deleting fails', () => {
      const id = 'WO202600001';
      let errorMessage = '';

      service.delete(id).subscribe({
        error: (error) => {
          errorMessage = error.message;
        }
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorMessage).toContain('500');
    });
  });
});
