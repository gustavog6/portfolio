import { Component } from '@angular/core';

import { Dialog } from '@angular/cdk/dialog';

import { Projects } from './../../models/portfolio.model';
import { ProjectDialogComponent } from './../project-dialog/project-dialog.component';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    standalone: true,
    imports: [NgFor],
})
export class PortfolioComponent {
  projects: Projects[];

  constructor(
    public dialog: Dialog,
    private portfolioService: PortfolioService
  ) {
    this.projects = portfolioService.projects;
  }

  openDialog(projectInfo: Projects) {
    this.dialog.open(ProjectDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        projectInfo: projectInfo,
      },
    });
  }
}
