import { Component, ChangeDetectionStrategy, signal, inject, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ParticipantProfileComponent {
  private geminiService = inject(GeminiService);

  tabs = ['Overview', 'Goals', 'Funding', 'Documents', 'Notes'];
  activeTab = signal('Overview');
  participantName = 'Eleanor Vance';
  participantId = 'P-73456';

  isGeneratingReport = signal(false);
  geminiReport = signal<string | null>(null);
  
  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
    // @ts-ignore
    lucide.createIcons();
  }

  async generateFullReport() {
    this.isGeneratingReport.set(true);
    this.geminiReport.set(null);
    const report = await this.geminiService.getParticipantSummary(this.participantId);
    this.geminiReport.set(report);
    this.isGeneratingReport.set(false);
  }
}
