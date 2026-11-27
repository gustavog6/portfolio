import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceContactIntent } from '../../models/retro-portfolio.models';

interface ServicePillar {
  id: Extract<ServiceContactIntent, 'expectation' | 'logistics' | 'experience'>;
  accent: 'gold' | 'cyan';
}

interface ServiceShowcaseItem {
  id: Extract<ServiceContactIntent, 'wedding' | 'christmas'>;
  tagKeys: string[];
  demoUrl: string;
}

@Component({
  selector: 'app-services-view',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './services-view.component.html',
  styleUrl: './services-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesViewComponent {
  readonly contactRequested = output<ServiceContactIntent>();

  readonly capabilityKeys: { key: string; accent: 'cyan' | 'gold' }[] = [
    { key: 'EVENT_SITES', accent: 'cyan' },
    { key: 'INTERACTIVE_INVITATIONS', accent: 'gold' },
    { key: 'EXPERIENCE_SOFTWARE', accent: 'cyan' },
    { key: 'REALTIME_PANELS', accent: 'gold' },
  ];

  readonly pillars: ServicePillar[] = [
    { id: 'expectation', accent: 'gold' },
    { id: 'logistics', accent: 'cyan' },
    { id: 'experience', accent: 'gold' },
  ];

  readonly examples: ServiceShowcaseItem[] = [
    {
      id: 'wedding',
      tagKeys: ['WEDDING', 'SMART_RSVP', 'ADMIN_PANEL', 'CUSTOM_DESIGN'],
      demoUrl: 'https://wedding-card-one.vivento.day/',
    },
    {
      id: 'christmas',
      tagKeys: ['CHRISTMAS', 'THEMED_EXPERIENCE', 'RSVP', 'MOBILE_FIRST'],
      demoUrl: 'https://christmas-card-one.vivento.day/',
    },
  ];
}
