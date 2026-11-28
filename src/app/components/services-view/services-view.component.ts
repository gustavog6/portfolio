import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ServiceContactIntent } from '../../models/retro-portfolio.models';

interface ServicePillar {
  id: Extract<ServiceContactIntent, 'expectation' | 'logistics' | 'experience'>;
  accent: 'gold' | 'cyan';
  illustration: string;
}

interface ServiceShowcaseItem {
  id: Extract<ServiceContactIntent, 'wedding' | 'christmas'>;
  tagKeys: string[];
  demoUrl: string;
  thumbnail: string;
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
    {
      id: 'expectation',
      accent: 'gold',
      illustration: 'assets/images/service-expectation.jpg',
    },
    {
      id: 'logistics',
      accent: 'cyan',
      illustration: 'assets/images/service-logistics.jpg',
    },
    {
      id: 'experience',
      accent: 'gold',
      illustration: 'assets/images/service-experience.jpg',
    },
  ];

  readonly examples: ServiceShowcaseItem[] = [
    {
      id: 'wedding',
      tagKeys: ['WEDDING', 'SMART_RSVP', 'ADMIN_PANEL', 'CUSTOM_DESIGN'],
      demoUrl:
        'https://wedding-card-one.vivento.day/?ref=00000000-0000-4000-8000-000000000001',
      thumbnail: 'assets/images/service-wedding-preview.png',
    },
    {
      id: 'christmas',
      tagKeys: ['CHRISTMAS', 'THEMED_EXPERIENCE', 'RSVP', 'MOBILE_FIRST'],
      demoUrl:
        'https://christmas-card-one.vivento.day/?ref=00000000-0000-4000-8000-000000000001',
      thumbnail: 'assets/images/service-christmas-preview.jpg',
    },
  ];
}
