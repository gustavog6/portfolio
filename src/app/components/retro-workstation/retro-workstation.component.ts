import { Location } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MobileSection,
  ServiceContactIntent,
  WorkTab,
} from '../../models/retro-portfolio.models';
import { ProfileAsideComponent } from '../profile-aside/profile-aside.component';
import { SkillsMatrixComponent } from '../skills-matrix/skills-matrix.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { WorkspaceTabsComponent } from '../workspace-tabs/workspace-tabs.component';
import { ContactViewComponent } from '../contact-view/contact-view.component';
import { ExperienceViewComponent } from '../experience-view/experience-view.component';
import { ProjectsViewComponent } from '../projects-view/projects-view.component';
import { ServicesViewComponent } from '../services-view/services-view.component';

const TAB_TITLES: Record<WorkTab, string> = {
  servicios: 'Servicios | Gustavo A. González — Software para Eventos',
  experiencia: 'Experiencia | Gustavo A. González — Full-Stack Engineer',
  proyectos: 'Proyectos | Gustavo A. González — Full-Stack Engineer',
  contacto: 'Contacto | Gustavo A. González — Full-Stack Engineer',
};

const DEFAULT_TITLE = 'Gustavo A. González | Full-Stack & Software para Eventos';

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
    ServicesViewComponent,
  ],
  templateUrl: './retro-workstation.component.html',
  styleUrl: './retro-workstation.component.css',
})
export class RetroWorkstationComponent {
  private readonly route = inject(ActivatedRoute, { optional: true });
  private readonly location = inject(Location, { optional: true });
  private readonly title = inject(Title, { optional: true });
  private readonly destroyRef = inject(DestroyRef, { optional: true });

  readonly activeTab = signal<WorkTab>('experiencia');
  readonly mobileSection = signal<MobileSection>('perfil');
  readonly tabChangeCount = signal(0);
  readonly contactIntent = signal<ServiceContactIntent | null>(null);

  readonly mobileSections: { id: MobileSection; label: string }[] = [
    { id: 'perfil', label: 'MOBILE.PROFILE' },
    { id: 'skills', label: 'MOBILE.SKILLS' },
    { id: 'servicios', label: 'MOBILE.SERVICES' },
    { id: 'experiencia', label: 'MOBILE.EXPERIENCE' },
    { id: 'proyectos', label: 'MOBILE.PROJECTS' },
    { id: 'contacto', label: 'MOBILE.CONTACT' },
  ];

  constructor() {
    if (this.route && this.destroyRef) {
      this.route.data
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          const routeTab = data['tab'] as WorkTab | undefined;
          if (routeTab) {
            this.activeTab.set(routeTab);
            this.mobileSection.set(routeTab);
            this.title?.setTitle(TAB_TITLES[routeTab]);
          } else {
            this.title?.setTitle(DEFAULT_TITLE);
          }
        });
    }
  }

  selectMobileSection(section: MobileSection): void {
    let changed = this.mobileSection() !== section;
    this.mobileSection.set(section);
    if (section !== 'perfil' && section !== 'skills') {
      if (section !== 'contacto') {
        this.contactIntent.set(null);
      }
      changed ||= this.activeTab() !== section;
      this.activeTab.set(section);
      this.syncUrl(section);
    } else {
      this.syncUrl(null);
    }
    if (changed) {
      this.tabChangeCount.update((count) => count + 1);
    }
  }

  selectTab(tab: WorkTab): void {
    if (tab !== 'contacto') {
      this.contactIntent.set(null);
    }
    const changed = this.activeTab() !== tab || this.mobileSection() !== tab;
    this.activeTab.set(tab);
    this.mobileSection.set(tab);
    this.syncUrl(tab);
    if (changed) {
      this.tabChangeCount.update((count) => count + 1);
    }
  }

  requestServiceContact(intent: ServiceContactIntent): void {
    this.contactIntent.set(intent);
    this.selectTab('contacto');
  }

  private syncUrl(tab: WorkTab | null): void {
    if (tab) {
      this.title?.setTitle(TAB_TITLES[tab]);
      this.location?.replaceState(`/${tab}`);
    } else {
      this.title?.setTitle(DEFAULT_TITLE);
      this.location?.replaceState('/');
    }
  }
}
