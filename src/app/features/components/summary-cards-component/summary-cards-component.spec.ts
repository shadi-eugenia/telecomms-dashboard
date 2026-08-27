import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCardsComponent } from './summary-cards-component';
import { WorkOrder } from '../../../core/models/work-order.model';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SummaryCardsComponent', () => {
  let component: SummaryCardsComponent;
  let fixture: ComponentFixture<SummaryCardsComponent>;

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
    },
    {
      id: 'WO202600003',
      site: 'Site-C789',
      region: 'AMER',
      status: 'Done',
      priority: 5,
      owner: 'Charlie Brown',
      slaDueAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      progressPct: 100
    },
    {
      id: 'WO202600004',
      site: 'Site-D012',
      region: 'ZIM',
      status: 'Blocked',
      priority: 2,
      owner: 'Diana Ross',
      slaDueAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      progressPct: 30
    },
    {
      id: 'WO202600005',
      site: 'Site-E345',
      region: 'RSA',
      status: 'New',
      priority: 4,
      owner: 'Eve Adams',
      slaDueAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      progressPct: 0
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardsComponent],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting(),]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardsComponent);
    component = fixture.componentInstance;
  });

  it('should correctly calculate region counts', () => {
    fixture.componentRef.setInput('workOrders', mockWorkOrders);

    fixture.detectChanges();

     const regionCounts = component.regionCounts();
    expect(regionCounts['AMER']).toBe(2); // WO202600001, WO202600003
    expect(regionCounts['RSA']).toBe(2); // WO202600002, WO202600005
    expect(regionCounts['ZIM']).toBe(1); // WO202600004
  });

  it('should correctly calculate status counts', () => {
    // Arrange
    fixture.componentRef.setInput('workOrders', mockWorkOrders);

    fixture.detectChanges();

     const statusCounts = component.statusCounts();
    expect(statusCounts['New']).toBe(2); // WO202600001, WO202600005
    expect(statusCounts['In Progress']).toBe(1); // WO202600002
    expect(statusCounts['Done']).toBe(1); // WO202600003
    expect(statusCounts['Blocked']).toBe(1); // WO202600004
  });

  it('should return correct count for a specific status using getCountByStatus', () => {
    // Arrange
    fixture.componentRef.setInput('workOrders', mockWorkOrders);

    fixture.detectChanges();

    // Act & Assert
    expect(component.getCountByStatus('New')).toBe(2);
    expect(component.getCountByStatus('Done')).toBe(1);
    expect(component.getCountByStatus('Blocked')).toBe(1);
    expect(component.getCountByStatus('NonExistentStatus')).toBe(0);
  });

    it('should handle empty work orders list', () => {
    // Arrange
    fixture.componentRef.setInput('workOrders', []);
    fixture.detectChanges();

    // Assert
    expect(component.regionCounts()).toEqual({});
    expect(component.statusCounts()).toEqual({});
    expect(component.getCountByStatus('New')).toBe(0);
  });

  it('should update metrics when work orders change', () => {
    fixture.componentRef.setInput('workOrders', mockWorkOrders.slice(0, 3));
    fixture.detectChanges();

    expect(component.getCountByStatus('New')).toBe(1);

    fixture.componentRef.setInput('workOrders', mockWorkOrders);
    fixture.detectChanges();

    expect(component.getCountByStatus('New')).toBe(2);
    expect(component.regionCounts()['AMER']).toBe(2);
    expect(component.regionCounts()['RSA']).toBe(2);
    expect(component.regionCounts()['ZIM']).toBe(1);
  });
});