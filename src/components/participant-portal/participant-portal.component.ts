import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-participant-portal',
  templateUrl: './participant-portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantPortalComponent {
 constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }
}
