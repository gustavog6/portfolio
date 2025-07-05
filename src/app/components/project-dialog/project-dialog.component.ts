import { Component, Inject } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { Projects } from './../../models/portfolio.model';
import { Skills } from './../../models/portfolio.model';
import { SkillsService } from './../../services/skills.service';
import { NgClass } from '@angular/common';

interface InputData {
  projectInfo: Projects;
}

interface OutputData {
  rta: boolean;
}

@Component({
    selector: 'app-project-dialog',
    templateUrl: './project-dialog.component.html',
    standalone: true,
    imports: [
    NgClass
],
})
export class ProjectDialogComponent {
  projectInfo: Projects;

  tech: Skills[];

  constructor(
    private dialogRef: DialogRef<OutputData>,
    @Inject(DIALOG_DATA) private data: InputData,
    private technologies: SkillsService
  ) {
    this.projectInfo = data.projectInfo;
    this.tech = technologies.techSkills;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
