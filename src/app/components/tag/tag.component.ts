import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    standalone: true,
    imports: [NgClass],
})
export class TagComponent {
  @Input() icon = '';

  @Input() svg = '';
}
