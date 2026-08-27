
---

## `SOLUTION.md`


```markdown
# Solution Design & Trade-offs

## Overview

This document outlines the design decisions, trade-offs, and technical approach used in building the Telecom Dashboard. The application demonstrates proficiency with Angular 20+, Signals, and modern testing practices.

## Requirements Fulfillment

### Data Dashboard

| Requirement | Implementation |
|-------------|----------------|
| Load ~500 work orders | `MockApiService` generates 500 realistic work orders |
| Render table efficiently | Angular Material Table with `MatTableDataSource` |
| Sorting OR filtering | Filtering by site/owner/ID with real-time search |
| Summary metric | Region distribution & status breakdown cards |

**Trade-off**: Chose filtering over sorting because it provides more immediate user value for finding specific work orders in an operational dashboard. With 500 rows, filtering feels more "dashboard-like" than sorting.

### SingleStep Status Update

| Requirement | Implementation |
|-------------|----------------|
| Reactive Form | `FormGroup` with status dropdown and optional note |
| REST update | `PUT` request to in-memory API |
| Simulate latency | `delay: 300` in mock API configuration |
| Error handling | Graceful error display via `MatSnackBar` |
| Efficient updates | Refetch approach - simple and consistent |

**Trade-off**: Refetching all data after update (instead of optimistic update) was chosen for simplicity and consistency. With 500 rows, the performance impact is negligible, and it guarantees data integrity.

### Unit Testing

| Requirement | Implementation |
|-------------|----------------|
| Service test - HTTP success | `work-order.service.spec.ts` - GET returns mock data |
| Service test - HTTP failure | `work-order.service.spec.ts` - 500 error handling |
| Component test - derived value | `summary-cards.component.spec.ts` - Region/status counts |

**Trade-off**: Kept tests minimal and focused exactly on what the assessment asked for. No over-engineering with unnecessary test coverage.

## Key Technical Decisions

### 1. Angular Signals over ngOnChanges

**Why**: Signals provide a more reactive and performant way to manage state. Used `signal()` for state, `computed()` for derived values, and `effect()` for side effects.

**Benefits**:
- Fine-grained change detection
- No need for `ngOnChanges` boilerplate
- Future-proof - aligns with Angular's roadmap

**Trade-off**: The benefits of signals helps the framework know where and when change happens and it updates the particular component without checking the entire tree.

### 2. angular-in-memory-web-api over json-server

**Why**: Zero external setup. The assessor can clone and run `npm install && ng serve` without starting a separate server.

**Benefits**:
- Self-contained
- Easy to simulate latency
- Supports REST operations (GET, PUT, DELETE)

**Trade-off**: Not a "real" API, but perfectly sufficient for a frontend assessment.

### 3. Angular Material over CDK/AG Grid

**Why**: Material Table is well-documented, handles 500 rows efficiently, and provides built-in filtering/sorting.

**Benefits**:
- Faster to implement without the learning curve for this assessment
- Good testability
- Minimal styling needed

**Trade-off**: More feature-rich out of the box for the assessment

### 4. Refetch over Optimistic Updates

**Why**: Simpler and guarantees consistency"

**Benefits**:
- No complex rollback logic at this stage
- Always shows correct data
- Easy to implement

**Trade-off**: Slightly more network traffic, but since the data is not huge the impact is minimal.

### 5. Zoneless Change Detection

**Why**: Angular 20 supports zoneless applications. Using `provideZonelessChangeDetection()` allows for Angular to update only the components that changed state.

**Benefits**:
- Better performance (no Zone.js overhead)
- Cleaner test setup
- Modern Angular pattern

**Trade-off**: Requires using Signals for change detection, which is already implemented.


## Possible Improvement

1. **Pagination**: Add virtual scrolling for smoother interaction with larger datasets
2. **Sorting**: Implement multi-column sorting alongside filtering
3. **Advanced Filters**: Filter by region, status, and priority simultaneously
4. **Bulk Operations**: Update multiple work orders at once
5. **Real API**: Replace mock with actual backend integration
6. **Tailwind CSS**: For cutomizing design
7. **internationalization (i18n)**: Add en.json for dynamic language switching. Quite useful especially for a scaling web app 
