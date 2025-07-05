import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    standalone: true,
})
export class ContactComponent {
  formspreeEndpoint = 'https://formspree.io/f/xvojggpw';
}
