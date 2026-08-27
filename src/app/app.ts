import { Component, signal } from '@angular/core';
import { DashboardComponent } from './features/components/dashboard-component/dashboard-component';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('telecomms-dashboard');
}
