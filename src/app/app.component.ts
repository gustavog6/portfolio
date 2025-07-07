import { Component, HostListener, OnInit } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { NgSwitch, NgSwitchCase, NgStyle } from '@angular/common';
import { initFlowbite } from 'flowbite';

// Tus componentes...
import { HeroComponent } from './components/hero/hero.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule, NgSwitch, NgSwitchCase, NgStyle,
    HeroComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, EducationComponent, ContactComponent
  ],
})
export class AppComponent implements OnInit {
  public sections = [
    { id: 'home',      icon: '🏠' },
    { id: 'about',     icon: '👤' },
    { id: 'skills',    icon: '⚡' },
    { id: 'portfolio', icon: '🚀' },
    { id: 'education', icon: '🎓' },
    { id: 'contact',   icon: '📧' },
  ];

  public currentSection = 1;
  private startFlag = true;
  private TIME_OUT = 800;

  // --- NUEVO: Estado para el control táctil ---
  private touchStartY = 0;

  constructor(private location: Location) { }

  ngOnInit(): void {
    initFlowbite();
    this.initializeFromURL();
  }

  // --- MANEJADOR PARA ESCRITORIO (RUEDA DEL RATÓN) ---
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (!this.startFlag) return;
    event.preventDefault();
    const scrollDown = event.deltaY > 0;
    this.handleInteraction(() => (scrollDown ? this.moveForward() : this.moveBackward()));
  }

  // --- MANEJADORES PARA TECLADO ---
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.startFlag) return;
    const key = event.key;
    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      event.preventDefault();
      this.handleInteraction(() => {
        if (key === 'ArrowDown') this.moveForward();
        else this.moveBackward();
      });
    }
  }

  // --- NUEVO: MANEJADORES PARA EVENTOS TÁCTILES (MÓVILES) ---

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.startFlag) return;
    // Guardamos la coordenada Y inicial del toque
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    // Prevenimos el scroll nativo del navegador mientras se desliza el dedo
    event.preventDefault();
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.startFlag) return;

    // Obtenemos la coordenada Y final
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - this.touchStartY;

    // Definimos un umbral para considerarlo un "swipe" y no un simple toque
    const swipeThreshold = 50; // 50px

    if (Math.abs(deltaY) > swipeThreshold) {
      const scrollDown = deltaY < 0; // Deslizar hacia arriba en la pantalla es como scrollear hacia abajo
      this.handleInteraction(() => (scrollDown ? this.moveForward() : this.moveBackward()));
    }
  }

  @HostListener('window:popstate')
  onPopState(): void { this.initializeFromURL(); }

  // --- LÓGICA DE NAVEGACIÓN (SIN CAMBIOS) ---

  private handleInteraction(action: () => void): void {
    this.startFlag = false;
    action();
    this.updateURL();
    setTimeout(() => {
      this.startFlag = true;
    }, this.TIME_OUT);
  }

  private moveForward(): void {
    if (this.currentSection < this.sections.length) {
      this.currentSection++;
    }
  }

  private moveBackward(): void {
    if (this.currentSection > 1) {
      this.currentSection--;
    }
  }

  public goToSection(sectionIndex: number): void {
    if (!this.startFlag || sectionIndex === this.currentSection) return;
    this.handleInteraction(() => {
      this.currentSection = sectionIndex;
    });
  }

  private updateURL(): void {
    const sectionId = this.sections[this.currentSection - 1]?.id;
    if (sectionId) {
      this.location.replaceState(`/#${sectionId}`);
    }
  }

  private initializeFromURL(): void {
    const hash = window.location.hash.replace('#', '');
    if (!hash) { this.updateURL(); return; }
    const sectionIndex = this.sections.findIndex(s => s.id === hash);
    if (sectionIndex !== -1) {
      this.currentSection = sectionIndex + 1;
    }
  }

  public getSectionTransform(sectionNumber: number): string {
    if (sectionNumber < this.currentSection) return 'translateY(-100vh)';
    if (sectionNumber === this.currentSection) return 'translateY(0)';
    return 'translateY(100vh)';
  }
}