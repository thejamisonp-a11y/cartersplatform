import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-incident-reporting',
  templateUrl: './incident-reporting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentReportingComponent {
 constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }
}
