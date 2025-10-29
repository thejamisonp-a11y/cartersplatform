import { Component, ChangeDetectionStrategy, afterNextRender, signal } from '@angular/core';

@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDashboardComponent {
  isGeneratingInsight = signal(false);
  aiInsight = signal<string | null>(null);

  private insights = [
    "Gemini has detected a <strong>15% increase</strong> in demand for weekend shifts over the past 90 days, particularly in the Northern region. Consider launching a targeted recruitment campaign for weekend staff to meet this growing need.",
    "Analysis of incident reports shows a <strong>10% decrease</strong> in medication errors since the new eMAR system was implemented. This suggests the new system is effective.",
    "Funding utilization is trending <strong>5% ahead of schedule</strong> for participants in the 'Independent Living' program. Review plans to ensure funds last for the entire period.",
    "There is a strong positive correlation between staff completing 'Advanced Communication' training and higher participant satisfaction scores. Recommend this training for all client-facing staff."
  ];

 constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }

  generateInsight() {
    this.isGeneratingInsight.set(true);
    this.aiInsight.set(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.insights.length);
      this.aiInsight.set(this.insights[randomIndex]);
      this.isGeneratingInsight.set(false);
    }, 1500);
  }
}