import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ServiceContactIntent } from '../../models/retro-portfolio.models';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.css',
})
export class ContactViewComponent {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly formspreeEndpoint = 'https://formspree.io/f/xvojggpw';
  readonly serviceIntent = input<ServiceContactIntent | null>(null);

  readonly subjectValue = signal('');
  readonly messageValue = signal('');
  private readonly userEdited = signal(false);

  constructor() {
    effect(() => {
      const intent = this.serviceIntent();
      this.userEdited.set(false);
      this.applyServicePreset(intent);
    });

    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.userEdited()) {
          this.applyServicePreset(this.serviceIntent());
        }
      });
  }

  onSubjectInput(event: Event): void {
    this.userEdited.set(true);
    this.subjectValue.set((event.target as HTMLInputElement).value);
  }

  onMessageInput(event: Event): void {
    this.userEdited.set(true);
    this.messageValue.set((event.target as HTMLTextAreaElement).value);
  }

  private applyServicePreset(intent: ServiceContactIntent | null): void {
    if (!intent) {
      this.subjectValue.set('');
      this.messageValue.set('');
      return;
    }

    const prefix = `CONTACT.SERVICE_PRESETS.${intent}`;
    this.subjectValue.set(this.translate.instant(`${prefix}.SUBJECT`));
    this.messageValue.set(this.translate.instant(`${prefix}.MESSAGE`));
  }
}
