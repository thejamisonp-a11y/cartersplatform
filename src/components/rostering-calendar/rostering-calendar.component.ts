import { Component, ChangeDetectionStrategy, afterNextRender, signal } from '@angular/core';

@Component({
  selector: 'app-rostering-calendar',
  templateUrl: './rostering-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RosteringCalendarComponent {
  showAiSuggestions = signal(false);

  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }

  toggleAiSuggestions() {
    this.showAiSuggestions.update(value => !value);
  }
}