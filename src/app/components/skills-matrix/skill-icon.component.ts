import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  Renderer2,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import {
  Angular,
  BookOpen,
  Bootstrap,
  CalendarCheck,
  Crown,
  Css3,
  Figma,
  Flask,
  Gestures,
  Git,
  Group,
  Html5,
  Javascript,
  Laravel,
  Layout,
  LightBulb,
  MessageDetail,
  MySql,
  Php,
  Python,
  React,
  RefreshCw,
  Shuffle,
  TailwindCss,
  TrendingUp,
  Typescript,
  createElement,
  type IconDefinition,
} from '@boxicons/js';
import { SkillIcon } from '../../models/retro-portfolio.models';

const ICONS: Record<string, IconDefinition> = {
  javascript: Javascript,
  typescript: Typescript,
  angular: Angular,
  react: React,
  php: Php,
  laravel: Laravel,
  'my-sql': MySql,
  css3: Css3,
  html5: Html5,
  'tailwind-css': TailwindCss,
  git: Git,
  figma: Figma,
  bootstrap: Bootstrap,
  python: Python,
  flask: Flask,
  layout: Layout,
  'refresh-cw': RefreshCw,
  'book-open': BookOpen,
  'message-detail': MessageDetail,
  'light-bulb': LightBulb,
  gestures: Gestures,
  shuffle: Shuffle,
  group: Group,
  'trending-up': TrendingUp,
  'calendar-check': CalendarCheck,
  crown: Crown,
};

@Component({
  selector: 'app-skill-icon',
  standalone: true,
  template: '<span #iconHost></span>',
  styleUrl: './skill-icon.component.css',
})
export class SkillIconComponent implements AfterViewInit, OnChanges {
  readonly icon = input.required<SkillIcon>();

  @ViewChild('iconHost', { static: true })
  private readonly iconHost!: ElementRef<HTMLSpanElement>;

  private readonly renderer = inject(Renderer2);
  private viewInitialized = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderIcon();
  }

  ngOnChanges(): void {
    if (this.viewInitialized) {
      this.renderIcon();
    }
  }

  private renderIcon(): void {
    const { name, pack } = this.icon();
    const definition = ICONS[name];

    if (!definition?.packs[pack]) {
      throw new Error(`Boxicon "${name}" does not provide the "${pack}" pack.`);
    }

    const svg = createElement(definition, {
      pack,
      width: '100%',
      height: '100%',
    });

    this.renderer.setStyle(svg, 'display', 'block');
    this.renderer.setProperty(this.iconHost.nativeElement, 'textContent', '');
    this.renderer.appendChild(this.iconHost.nativeElement, svg);
  }
}
