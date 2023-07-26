import { Component } from '@angular/core';
import { RRSS } from './../../models/portfolio.model';
import { RrssService } from './../../services/rrss.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  rrssLinks: RRSS[];

  heroText =
    'I am familiar with Javascript, Angular, React, Wit.ai, HTML/CSS, TailwindCSS, GIT and WordPress, I am also excited to improve my skills. I am about to finish my studies in Computer Engineering, so I am available to work, collaborate, learn from the team and add value to the processes.';

  constructor(private links: RrssService) {
    this.rrssLinks = links.rrss;
  }

  getResumeLink() {
    return this.rrssLinks
      .filter((rrss) => rrss.title === 'Resume')
      .map((link) => link.link);
  }
}
