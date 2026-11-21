import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceEntry } from '../../models/retro-portfolio.models';

@Component({
  selector: 'app-experience-view',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience-view.component.html',
  styleUrl: './experience-view.component.css',
})
export class ExperienceViewComponent {
  readonly entries: ExperienceEntry[] = [
    {
      id: 'emqu-technical-lead',
      company: 'EmQu Technologies LLC',
      period: '2025-07 - 2026-07',
      type: 'professional',
      highlights: [
        {
          id: 'lead-web-app',
        },
        {
          id: 'lead-requirements',
        },
        {
          id: 'lead-mentorship',
        },
      ],
    },
    {
      id: 'emqu-fullstack',
      company: 'EmQu Technologies LLC',
      period: '2024-07 - 2025-07',
      type: 'professional',
      highlights: [
        {
          id: 'fullstack-ui',
        },
        {
          id: 'fullstack-backend',
        },
        {
          id: 'fullstack-workflows',
        },
      ],
    },
    {
      id: 'dilvant-web-developer',
      company: 'Dilvant',
      period: '2023-08 - 2024-04',
      type: 'professional',
      highlights: [
        {
          id: 'dilvant-crm',
        },
        {
          id: 'dilvant-websites',
        },
        {
          id: 'dilvant-cards',
        },
      ],
    },
    {
      id: 'inexco-analyst',
      company: 'Inexco Group',
      period: '2019-05 - 2023-01',
      type: 'professional',
      highlights: [
        {
          id: 'inexco-crm',
        },
      ],
    },
    {
      id: 'jacinto-convit-volunteering',
      company: 'Fundación Jacinto Convit',
      period: '2023-04 - 2023-06',
      type: 'volunteering',
      highlights: [
        {
          id: 'convit-library',
        },
        {
          id: 'convit-requirements',
        },
      ],
    },
  ];
}
