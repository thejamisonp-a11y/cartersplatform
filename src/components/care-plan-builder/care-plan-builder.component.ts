import { Component, ChangeDetectionStrategy, signal, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-care-plan-builder',
  templateUrl: './care-plan-builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class CarePlanBuilderComponent {
  private geminiService = inject(GeminiService);
  steps = ['Select Template', 'Enter Goals', 'AI Suggestions', 'Finalize'];
  currentStep = signal(0);
  
  selectedGoal = signal('');
  isGeneratingSuggestions = signal(false);
  suggestions = signal<string[]>([]);
  
  constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }

  nextStep() {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }
  
  async getSuggestions() {
    if(!this.selectedGoal()) return;
    this.isGeneratingSuggestions.set(true);
    const result = await this.geminiService.getCarePlanSuggestions(this.selectedGoal());
    this.suggestions.set(result);
    this.isGeneratingSuggestions.set(false);
  }
}
