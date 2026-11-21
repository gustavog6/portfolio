import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, input } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AvatarCapsuleComponent } from '../avatar-capsule/avatar-capsule.component';

@Component({
  selector: 'app-profile-aside',
  standalone: true,
  imports: [AvatarCapsuleComponent, TranslatePipe],
  templateUrl: './profile-aside.component.html',
  styleUrl: './profile-aside.component.css',
})
export class ProfileAsideComponent implements AfterViewInit, OnDestroy {
  readonly contactActive = input.required<boolean>();
  readonly tabChangeCount = input.required<number>();

  private readonly translate = inject(TranslateService);
  @ViewChild('bio', { static: true }) private bio!: ElementRef<HTMLParagraphElement>;
  @ViewChild('bioSource', { static: true }) private bioSource!: ElementRef<HTMLSpanElement>;
  @ViewChild('bioPreview', { static: true }) private bioPreview!: ElementRef<HTMLSpanElement>;
  @ViewChild('bioMore', { static: true }) private bioMore!: ElementRef<HTMLButtonElement>;

  private bioResizeObserver?: ResizeObserver;
  private bioContentObserver?: MutationObserver;
  private languageChangeSubscription?: Subscription;
  private positionFrame?: number;

  ngAfterViewInit(): void {
    this.bioResizeObserver = new ResizeObserver(() => this.scheduleBioPreview());
    this.bioResizeObserver.observe(this.bio.nativeElement);
    this.bioResizeObserver.observe(this.bioMore.nativeElement);

    this.bioContentObserver = new MutationObserver(() => this.scheduleBioPreview());
    const textChanges = {
      characterData: true,
      childList: true,
      subtree: true,
    };
    this.bioContentObserver.observe(this.bioSource.nativeElement, textChanges);
    this.bioContentObserver.observe(this.bioMore.nativeElement, textChanges);
    this.languageChangeSubscription = this.translate.onLangChange.subscribe(() => this.scheduleBioPreview());

    void document.fonts.ready.then(() => this.scheduleBioPreview());
    this.scheduleBioPreview();
  }

  ngOnDestroy(): void {
    this.bioResizeObserver?.disconnect();
    this.bioContentObserver?.disconnect();
    this.languageChangeSubscription?.unsubscribe();

    if (this.positionFrame !== undefined) {
      cancelAnimationFrame(this.positionFrame);
    }
  }

  private scheduleBioPreview(): void {
    if (this.positionFrame !== undefined) {
      cancelAnimationFrame(this.positionFrame);
    }

    this.positionFrame = requestAnimationFrame(() => this.updateBioPreview());
  }

  private updateBioPreview(): void {
    const bio = this.bio.nativeElement;
    const source = this.bioSource.nativeElement.textContent?.trim() ?? '';
    const preview = this.bioPreview.nativeElement;
    const button = this.bioMore.nativeElement;

    if (getComputedStyle(preview).display === 'none' || !source) {
      return;
    }

    let low = 0;
    let high = source.length;
    let bestPreview = ' ';

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const wordEnd = middle >= source.length ? source.length : source.lastIndexOf(' ', middle);
      const end = wordEnd > 0 ? wordEnd : middle;
      const candidate = source.slice(0, end).trimEnd();
      preview.textContent = `${candidate} `;

      const bioRect = bio.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const fits = buttonRect.bottom <= bioRect.bottom + 0.5 && buttonRect.right <= bioRect.right + 0.5;

      if (fits) {
        bestPreview = `${candidate} `;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }

    preview.textContent = bestPreview;
  }
}
