import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardAdminComponent {
  kpiCards = [
    { title: 'Active Participants', value: '128', change: '+5.2%', icon: 'users', color: 'text-blue-500' },
    { title: 'Staff On Shift', value: '34', change: '+2', icon: 'user-check', color: 'text-green-500' },
    { title: 'Compliance Risk', value: 'High', change: '3 documents expired', icon: 'shield-alert', color: 'text-red-500' },
  ];

  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }
}
