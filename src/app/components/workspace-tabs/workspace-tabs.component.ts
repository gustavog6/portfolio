import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WorkTab } from '../../models/retro-portfolio.models';

@Component({
  selector: 'app-workspace-tabs',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './workspace-tabs.component.html',
  styleUrl: './workspace-tabs.component.css',
})
export class WorkspaceTabsComponent {
  readonly activeTab = input.required<WorkTab>();
  readonly tabChange = output<WorkTab>();

  readonly tabs: { id: WorkTab; label: string; icon: string }[] = [
    { id: 'servicios', label: 'TABS.SERVICES', icon: 'bx-customize' },
    { id: 'experiencia', label: 'TABS.EXPERIENCE', icon: 'bx-briefcase-alt-2' },
    { id: 'proyectos', label: 'TABS.PROJECTS', icon: 'bx-folder-open' },
    { id: 'contacto', label: 'TABS.CONTACT', icon: 'bx-message-square-dots' },
  ];
}
