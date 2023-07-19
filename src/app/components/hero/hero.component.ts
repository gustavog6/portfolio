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
    "I'm familiar with Javascript, React, Angular, HTML/CSS, WordPress, and GIT, and I'm excited to improve my skills. I have the desire to find my first job in the industry where I can collaborate, learn from the team and add value in the processes.";

  constructor(private links: RrssService) {
    this.rrssLinks = links.rrss;
  }

  getResumeLink() {
    return this.rrssLinks
      .filter((rrss) => rrss.title === 'Resume')
      .map((link) => link.link);
  }
}
