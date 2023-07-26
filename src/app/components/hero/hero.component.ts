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
    "I'm familiar with Javascript, Angular, React, Wit.ai, HTML/CSS, TailwindCSS, GIT and WordPress, and I'm excited to improve my skills. I have all the will to find my first job in the industry where I can collaborate, learn from the team and add value to the processes.";

  constructor(private links: RrssService) {
    this.rrssLinks = links.rrss;
  }

  getResumeLink() {
    return this.rrssLinks
      .filter((rrss) => rrss.title === 'Resume')
      .map((link) => link.link);
  }
}
