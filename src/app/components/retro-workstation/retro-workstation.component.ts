import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MobileSection,
  WorkTab,
} from '../../models/retro-portfolio.models';
import { ProfileAsideComponent } from '../profile-aside/profile-aside.component';
import { SkillsMatrixComponent } from '../skills-matrix/skills-matrix.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { WorkspaceTabsComponent } from '../workspace-tabs/workspace-tabs.component';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { ExperienceViewComponent } from '../experience-view/experience-view.component';
import { ProjectsViewComponent } from '../projects-view/projects-view.component';

@Component({
  selector: 'app-retro-workstation',
  standalone: true,
  imports: [
    TranslatePipe,
    TopbarComponent,
    ProfileAsideComponent,
    SkillsMatrixComponent,
    WorkspaceTabsComponent,
    ContactViewComponent,
    ExperienceViewComponent,
    ProjectsViewComponent,
  ],
  templateUrl: './retro-workstation.component.html',
  styleUrl: './retro-workstation.component.css',
})
export class RetroWorkstationComponent {
  readonly activeTab = signal<WorkTab>('experiencia');
  readonly mobileSection = signal<MobileSection>('perfil');
  readonly tabChangeCount = signal(0);

  readonly mobileSections: { id: MobileSection; label: string }[] = [
    { id: 'perfil', label: 'MOBILE.PROFILE' },
    { id: 'skills', label: 'MOBILE.SKILLS' },
    { id: 'experiencia', label: 'MOBILE.EXPERIENCE' },
    { id: 'proyectos', label: 'MOBILE.PROJECTS' },
    { id: 'contacto', label: 'MOBILE.CONTACT' },
  ];

  selectMobileSection(section: MobileSection): void {
    let changed = this.mobileSection() !== section;
    this.mobileSection.set(section);
    if (section !== 'perfil' && section !== 'skills') {
      changed ||= this.activeTab() !== section;
      this.activeTab.set(section);
    }
    if (changed) {
      this.tabChangeCount.update((count) => count + 1);
    }
  }

  selectTab(tab: WorkTab): void {
    const changed = this.activeTab() !== tab || this.mobileSection() !== tab;
    this.activeTab.set(tab);
    this.mobileSection.set(tab);
    if (changed) {
      this.tabChangeCount.update((count) => count + 1);
    }
  }
}
