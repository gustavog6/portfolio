import { Component } from '@angular/core';

import { Collapse } from 'flowbite';
import { RRSS } from './../../models/portfolio.model';
import { RrssService } from 'src/app/services/rrss.service';
import { NgClass } from '@angular/common';

type tabType = 'home' | 'about-me' | 'skills' | 'portfolio' | 'education' | 'contact';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    standalone: true,
    imports: [NgClass],
})
export class NavbarComponent {
  public currentTab: tabType = 'home';

  public aria: true | false = false;

  rrssLinks: RRSS[];

  constructor(private link: RrssService) {
    this.rrssLinks = link.rrss;
  }

  getLink() {
    return this.rrssLinks
      .filter((item) => item.title === 'Whatsapp')
      .map((link) => link.link);
  }

  clicked(ct: tabType) {
    this.currentTab = ct;
    this.aria = false;
  }
}
