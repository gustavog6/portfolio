import { Component } from '@angular/core';

// import { Collapse } from 'flowbite';
import { RRSS } from './../../models/portfolio.model';
import { RrssService } from 'src/app/services/rrss.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  rrssLinks: RRSS[];

  constructor(private link: RrssService) {
    this.rrssLinks = link.rrss;
  }

  // set the target element that will be collapsed or expanded (eg. navbar menu)
  $targetEl = document.getElementById('targetEl');

  // optionally set a trigger element (eg. a button, hamburger icon)
  $triggerEl = document.getElementById('triggerEl');

  // optional options with default values and callback functions
  options = {
    onCollapse: () => {
      console.log('element has been collapsed');
    },
    onExpand: () => {
      console.log('element has been expanded');
    },
    onToggle: () => {
      console.log('element has been toggled');
    },
  };

  // collapse = new Collapse(this.$targetEl, this.$triggerEl, this.options);

  getLink() {
    return this.rrssLinks
      .filter((item) => item.title === 'Whatsapp')
      .map((link) => link.link);
  }
}
