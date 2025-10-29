import { Component, ChangeDetectionStrategy, signal, effect, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all screen components
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ParticipantProfileComponent } from './components/participant-profile/participant-profile.component';
import { CarePlanBuilderComponent } from './components/care-plan-builder/care-plan-builder.component';
import { RosteringCalendarComponent } from './components/rostering-calendar/rostering-calendar.component';
import { StaffPortalComponent } from './components/staff-portal/staff-portal.component';
import { ComplianceCentreComponent } from './components/compliance-centre/compliance-centre.component';
import { FinanceBillingComponent } from './components/finance-billing/finance-billing.component';
import { IncidentReportingComponent } from './components/incident-reporting/incident-reporting.component';
import { ParticipantPortalComponent } from './components/participant-portal/participant-portal.component';
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

type Screen = { id: string; name: string; icon: string; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DashboardAdminComponent,
    ParticipantProfileComponent,
    CarePlanBuilderComponent,
    RosteringCalendarComponent,
    StaffPortalComponent,
    ComplianceCentreComponent,
    FinanceBillingComponent,
    IncidentReportingComponent,
    ParticipantPortalComponent,
    AnalyticsDashboardComponent,
    ChatbotComponent,
  ]
})
export class AppComponent {
  isSidebarOpen = signal(true);
  
  screens: Screen[] = [
    { id: 'dashboard_admin', name: 'Admin Dashboard', icon: 'layout-grid' },
    { id: 'participant_profile', name: 'Participant Profile', icon: 'user' },
    { id: 'care_plan_builder', name: 'Care Plan Builder', icon: 'file-plus-2' },
    { id: 'rostering_calendar', name: 'Rostering', icon: 'calendar' },
    { id: 'staff_portal', name: 'Staff Portal', icon: 'smartphone' },
    { id: 'compliance_centre', name: 'Compliance Centre', icon: 'shield-check' },
    { id: 'finance_billing', name: 'Finance & Billing', icon: 'dollar-sign' },
    { id: 'incident_reporting', name: 'Incident Reporting', icon: 'siren' },
    { id: 'participant_portal', name: 'Participant Portal', icon: 'heart-handshake' },
    { id: 'analytics_dashboard', name: 'Reports & Analytics', icon: 'line-chart' }
  ];

  activeScreen = signal<Screen>(this.screens[0]);

  constructor() {
    // This effect handles both the initial render and subsequent screen changes,
    // ensuring icons are always created after the view updates.
    effect(() => {
      // Accessing the signal registers it as a dependency for the effect.
      this.activeScreen();
      
      // The effect runs after render, but to be absolutely sure the DOM is painted,
      // we use a macrotask (setTimeout) to schedule the icon creation.
      // This avoids the NG0203 error from calling injection-context-aware functions inside an effect.
      setTimeout(() => {
        // @ts-ignore
        lucide.createIcons();
      }, 0);
    });
  }

  changeScreen(screen: Screen) {
    this.activeScreen.set(screen);
    // The effect in the constructor will now handle re-rendering icons automatically.
  }

  toggleSidebar() {
    this.isSidebarOpen.update(open => !open);
  }
}