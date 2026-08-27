# TelecommsDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.34.

## Context

This project was built as a take-home assignment for a telecommunications platform. The requirements focused on:
- Displaying ~500 work orders in a responsive table
- Supporting status updates with local REST integration
- Unit testing with Angular's test runner

## Features
- Dashboard: Displays ~500 work orders with status, region and overall summary cards
- Realtime filter: You can filter by owner or site
- Status Update: Modal dialog with form validation
- Delete confirmation: Material Dialog with confirmation


## Project Structure 
```bash
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── work-order.model.ts
│   │   │   └── dialog.models.ts
│   │   └── services/
│   │       ├── mock-api.service.ts
│   │       └── work-order.service.ts
│   └── features/
│       └── work-orders/
│           └── components/
│               ├── confirm-dialog/
│               ├── status-update-dialog/
│               ├── summary-cards/
│               ├── work-order-table/
│               └── work-order-dashboard/
└── styles.scss
```

## Quick Start

```bash 

# Install dependencies
npm install

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
