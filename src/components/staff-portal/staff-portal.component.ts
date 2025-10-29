import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-staff-portal',
  templateUrl: './staff-portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffPortalComponent {
  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }
}
