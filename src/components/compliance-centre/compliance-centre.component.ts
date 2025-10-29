import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-compliance-centre',
  templateUrl: './compliance-centre.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplianceCentreComponent {
  documents = [
    { name: 'First Aid Certificate', owner: 'John Doe', expiry: '2024-07-15', status: 'Expiring Soon' },
    { name: 'Police Check', owner: 'Jane Smith', expiry: '2025-01-22', status: 'Valid' },
    { name: 'WWCC', owner: 'David Chen', expiry: '2024-06-01', status: 'Expired' },
    { name: 'Driver\'s License', owner: 'Emily White', expiry: '2026-11-10', status: 'Valid' },
    { name: 'NDIS Worker Screening', owner: 'Michael Brown', expiry: '2024-08-30', status: 'Expiring Soon' },
  ];
  
  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-amber-100 text-amber-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
