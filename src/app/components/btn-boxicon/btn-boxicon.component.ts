import { Component } from '@angular/core';
import { RRSS } from './../../models/portfolio.model';
import { RrssService } from './../../services/rrss.service';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-btn-boxicon',
    templateUrl: './btn-boxicon.component.html',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        NgClass,
    ],
})
export class BtnBoxiconComponent {
  rrssLinks: RRSS[];

  constructor(private links: RrssService) {
    this.rrssLinks = links.rrss;
  }
}
