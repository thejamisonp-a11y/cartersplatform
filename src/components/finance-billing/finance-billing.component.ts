import { Component, ChangeDetectionStrategy, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-finance-billing',
  templateUrl: './finance-billing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceBillingComponent {
 constructor() {
    afterNextRender(() => {
      // @ts-ignore
      lucide.createIcons();
    });
  }
}
