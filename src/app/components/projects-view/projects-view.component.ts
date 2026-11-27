import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioService } from '../../services/portfolio.service';
import { WorkstationProject } from '../../models/retro-portfolio.models';

@Component({
  selector: 'app-projects-view',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './projects-view.component.html',
  styleUrl: './projects-view.component.css',
})
export class ProjectsViewComponent {
  private readonly portfolioService = inject(PortfolioService);

  readonly projects: WorkstationProject[] = this.portfolioService.projects.map(
    (project) => ({
      id: project.title.toLowerCase().replaceAll(' ', '-'),
      link: project.link,
      technologies: project.technologies,
    }),
  );
}
