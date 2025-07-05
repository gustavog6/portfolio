import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    standalone: true,
    imports: [NgIf, NgClass],
})
export class TagComponent {
  @Input() icon = '';

  @Input() svg = '';
}
