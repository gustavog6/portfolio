import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
  signal,
} from '@angular/core';
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
  readonly bioTruncated = signal(false);

  private readonly translate = inject(TranslateService);
  @ViewChild('profile', { static: true }) private profile!: ElementRef<HTMLElement>;
  @ViewChild('bioContainer', { static: true }) private bioContainer!: ElementRef<HTMLElement>;
  @ViewChild('bioSource', { static: true }) private bioSource!: ElementRef<HTMLSpanElement>;
  @ViewChild('bioMeasure', { static: true }) private bioMeasure!: ElementRef<HTMLSpanElement>;
  @ViewChild('bioPreview', { static: true }) private bioPreview!: ElementRef<HTMLSpanElement>;
  @ViewChild('bioMore', { static: true }) private bioMore!: ElementRef<HTMLButtonElement>;

  private bioResizeObserver?: ResizeObserver;
  private bioContentObserver?: MutationObserver;
  private languageChangeSubscription?: Subscription;
  private positionFrame?: number;

  ngAfterViewInit(): void {
    this.bioResizeObserver = new ResizeObserver(() => this.scheduleBioPreview());
    this.bioResizeObserver.observe(this.profile.nativeElement);
    this.bioResizeObserver.observe(this.bioContainer.nativeElement);
    this.bioResizeObserver.observe(this.bioMeasure.nativeElement);
    this.bioResizeObserver.observe(this.bioMore.nativeElement);

    this.bioContentObserver = new MutationObserver(() => this.scheduleBioPreview());
    const textChanges = {
      characterData: true,
      childList: true,
      subtree: true,
    };
    this.bioContentObserver.observe(this.bioSource.nativeElement, textChanges);
    this.bioContentObserver.observe(this.bioMeasure.nativeElement, textChanges);
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
    const source = this.bioSource.nativeElement.textContent?.trim() ?? '';
    const preview = this.bioPreview.nativeElement;

    if (!window.matchMedia('(max-width: 768px)').matches) {
      this.bioTruncated.set(false);
      preview.textContent = '';
      return;
    }

    if (!source) {
      return;
    }

    const container = this.bioContainer.nativeElement;
    const containerStyle = getComputedStyle(container);
    const containerHeight =
      container.clientHeight -
      parseFloat(containerStyle.paddingTop) -
      parseFloat(containerStyle.paddingBottom);
    const fullBioHeight = this.bioMeasure.nativeElement.getBoundingClientRect().height;

    if (fullBioHeight <= containerHeight + 0.5) {
      this.bioTruncated.set(false);
      preview.textContent = '';
      return;
    }

    if (!this.bioTruncated()) {
      this.bioTruncated.set(true);
      this.scheduleBioPreview();
      return;
    }

    const button = this.bioMore.nativeElement;
    let low = 0;
    let high = source.length;
    let bestPreview = ' ';

    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const wordEnd = middle >= source.length ? source.length : source.lastIndexOf(' ', middle);
      const end = wordEnd > 0 ? wordEnd : middle;
      const candidate = source.slice(0, end).trimEnd();
      preview.textContent = `${candidate} `;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const bottomLimit =
        containerRect.bottom -
        parseFloat(containerStyle.borderBottomWidth) -
        parseFloat(containerStyle.paddingBottom);
      const rightLimit =
        containerRect.right -
        parseFloat(containerStyle.borderRightWidth) -
        parseFloat(containerStyle.paddingRight);
      const fits = buttonRect.bottom <= bottomLimit + 0.5 && buttonRect.right <= rightLimit + 0.5;

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
