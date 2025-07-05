import { Component } from '@angular/core';
import { Skills } from './../../models/portfolio.model';
import { SkillsService } from './../../services/skills.service';

import { TagComponent } from '../tag/tag.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    standalone: true,
    imports: [TagComponent],
})
export class SkillsComponent {
  techs: Skills[];

  softs: Skills[];

  constructor(
    private technologies: SkillsService,
    private softSkills: SkillsService
  ) {
    this.techs = technologies.techSkills;
    this.softs = technologies.softSkills;
  }
}
