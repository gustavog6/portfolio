import { Component } from '@angular/core';
import { Skills } from './../../models/portfolio.model';
import { SkillsService } from './../../services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
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
