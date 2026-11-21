import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css',
})
export class ContactViewComponent {
  readonly formspreeEndpoint = 'https://formspree.io/f/xvojggpw';
}
