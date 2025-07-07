import { Component, HostListener, AfterViewInit, ElementRef } from '@angular/core';
// CORRECCIÓN: Se inyecta el servicio 'Location' de Angular
import { Location, NgFor, NgSwitch, NgSwitchCase, NgStyle } from '@angular/common';
import { initFlowbite } from 'flowbite';
// CORRECCIÓN: Se quita la importación de NavbarComponent
import { HeroComponent } from './components/hero/hero.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';

import { PortfolioService } from './services/portfolio.service'; // Asegúrate que la ruta es correcta

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgStyle,
    // CORRECCIÓN: Se quita NavbarComponent de los imports
    HeroComponent,
    AboutMeComponent,
    SkillsComponent,
    PortfolioComponent,
    EducationComponent,
    ContactComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

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
  private TIME_OUT = 600;
  private initialScroll = 0;

  private sectionConfig: { [key: number]: number } = {}; // Inicia vacío

  // NUEVAS PROPIEDADES PARA MOBILE
  private isMobileDevice = false;
  private touchStartY = 0;
  private touchEndY = 0;
  private lastTouchTime = 0;
  private TOUCH_THRESHOLD = 30; // Umbral más pequeño para mayor sensibilidad
  private MOBILE_TOUCH_DELAY = 150; // Delay más corto para mejor respuesta
  private isScrolling = false; // Flag para prevenir scroll del navegador
  private isVerticalSwipe = false; // Flag para detectar swipe vertical

  constructor(
    private elementRef: ElementRef,
    private location: Location,
    private portfolioService: PortfolioService // Inyecta el servicio de portfolio
  ) {
    // --- CONFIGURACIÓN DINÁMICA ---
    const portfolioSubsections = 1 + this.portfolioService.projects.length; // 1 para el título + N proyectos

    this.sectionConfig = {
      3: 3, // Skills: 1 título + 2 de contenido
      4: portfolioSubsections, // Portfolio: 1 título + N proyectos
    };

    // NUEVA LÍNEA: Detectar si es mobile
    this.isMobileDevice = this.detectMobile();
  }

  ngOnInit(): void {
    initFlowbite();
  }

  ngAfterViewInit(): void {
    const layout = this.elementRef.nativeElement.querySelector('.layout');
    if (layout) {
      layout.style.height = `calc(100vh * ${this.sections.length})`;
    }
    // CORRECCIÓN: Llama a la función para cargar la sección desde la URL
    this.initializeSectionFromURL();
    this.initialScroll = window.scrollY;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    // Si es mobile, no usar scroll para navegación
    if (this.isMobileDevice) {
      return;
    }

    // Tu código existente para desktop
    if (this.startFlag) {
      const scrollDown = window.scrollY >= this.initialScroll;
      this.handleInteraction(() => (scrollDown ? this.moveForward() : this.moveBackward()));
    }
    window.scroll(0, window.screen.height);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (this.startFlag && ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(key)) {
      event.preventDefault();
      this.handleInteraction(() => {
        if (key === 'ArrowDown' || key === 'ArrowRight') this.moveForward();
        else this.moveBackward();
      });
    }
  }

  /**
   * Maneja el inicio del touch en mobile
   */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.isMobileDevice) return;
    
    this.touchStartY = event.touches[0].clientY;
    this.isScrolling = false;
    this.isVerticalSwipe = false;
  }

  /**
   * Maneja el movimiento del touch en mobile
   */
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isMobileDevice) return;
    
    const currentY = event.touches[0].clientY;
    const deltaY = Math.abs(this.touchStartY - currentY);
    
    // Solo prevenir scroll si es un swipe vertical significativo
    if (deltaY > this.TOUCH_THRESHOLD) {
      this.isVerticalSwipe = true;
      this.isScrolling = true;
      
      // Solo prevenir scroll si estamos en navegación de secciones
      if (this.startFlag) {
        event.preventDefault();
      }
    }
  }

  /**
   * Maneja el fin del touch en mobile
   */
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.isMobileDevice) return;
    
    this.touchEndY = event.changedTouches[0].clientY;
    
    // Solo procesar si fue un swipe vertical
    if (this.isVerticalSwipe) {
      this.handleMobileSwipe();
    }
    
    // Reset flags
    this.isScrolling = false;
    this.isVerticalSwipe = false;
  }

  /**
   * Actualiza la detección de mobile en resize
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.isMobileDevice = this.detectMobile();
  }

  private handleInteraction(action: () => void): void {
    this.startFlag = false;
    document.body.style.overflowY = 'hidden';
    action();
    setTimeout(() => {
      this.initialScroll = window.scrollY;
      this.startFlag = true;
      document.body.style.overflowY = 'scroll';
    }, this.TIME_OUT);
  }

  private moveForward(): void {
    if (this.currentSection < this.sections.length) {
      this.currentSection++;
      this.updateURL(); // CORRECCIÓN: Actualiza la URL al cambiar de sección
    }
  }

  private moveBackward(): void {
    if (this.currentSection > 1) {
      this.currentSection--;
      this.updateURL(); // CORRECCIÓN: Actualiza la URL al cambiar de sección
    }
  }

  public goToSection(sectionIndex: number): void {
    if (this.startFlag && sectionIndex !== this.currentSection) {
      this.handleInteraction(() => {
        this.currentSection = sectionIndex;
        this.updateURL(); // CORRECCIÓN: Actualiza la URL al cambiar de sección
      });
    }
  }

  public getSectionTransform(sectionNumber: number): string {
    if (sectionNumber < this.currentSection) return 'translateY(-100vh)';
    if (sectionNumber === this.currentSection) return 'translateY(0)';
    return 'translateY(100vh)';
  }

  // --- CORRECCIÓN: NUEVAS FUNCIONES PARA MANEJAR LA URL ---

  /**
   * Actualiza el ancla en la URL del navegador sin recargar la página.
   */
  private updateURL(): void {
    const sectionId = this.sections[this.currentSection - 1].id;
    this.location.replaceState(`/#${sectionId}`);
  }

  /**
   * Lee el ancla de la URL al cargar la página y establece la sección inicial.
   */
  private initializeSectionFromURL(): void {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      const sectionIndex = this.sections.findIndex(sec => sec.id === hash);
      if (sectionIndex !== -1) {
        this.currentSection = sectionIndex + 1;
      }
    }
    // Asegura que la URL inicial sea la correcta
    this.updateURL();
  }

  // NUEVOS MÉTODOS PARA MOBILE

  /**
   * Detecta si es un dispositivo móvil
   */
  private detectMobile(): boolean {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Procesa el swipe en mobile con protección contra múltiples disparos
   */
  private handleMobileSwipe(): void {
    const now = Date.now();
    
    // Prevenir swipes muy rápidos
    if (now - this.lastTouchTime < this.MOBILE_TOUCH_DELAY) {
      return;
    }

    const deltaY = this.touchStartY - this.touchEndY;
    const absDeltaY = Math.abs(deltaY);
    
    // Solo procesar si el swipe es suficientemente largo
    if (absDeltaY > this.TOUCH_THRESHOLD && this.isScrolling) {
      if (this.startFlag) {
        this.handleInteraction(() => {
          if (deltaY > 0) {
            this.moveForward(); // Swipe hacia arriba
          } else {
            this.moveBackward(); // Swipe hacia abajo
          }
        });
        this.lastTouchTime = now;
      }
    }
  }
}