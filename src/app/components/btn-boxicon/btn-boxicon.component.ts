import { Component } from '@angular/core';
import { RRSS } from './../../models/portfolio.model';
import { RrssService } from './../../services/rrss.service';

@Component({
  selector: 'app-btn-boxicon',
  templateUrl: './btn-boxicon.component.html',
})
export class BtnBoxiconComponent {
  rrssLinks: RRSS[];

  constructor(private links: RrssService) {
    this.rrssLinks = links.rrss;
  }
}
