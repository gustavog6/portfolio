import { Component, computed, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RrssService } from '../../services/rrss.service';
import { ContactChannel } from '../../models/retro-portfolio.models';

@Component({
  selector: 'app-workstation-topbar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private readonly rrssService = inject(RrssService);
  private readonly translate = inject(TranslateService);
  readonly currentLanguage = this.translate.currentLang;
  readonly cvUrl = computed(() =>
    this.currentLanguage() === 'es' ? '/assets/cv/cv-es.pdf' : '/assets/cv/cv-en.pdf',
  );

  readonly channels: ContactChannel[] = this.rrssService.rrss
    .filter((channel) => ['LinkedIn', 'Github', 'Whatsapp'].includes(channel.title))
    .map((channel) => ({
      id: channel.title.toLowerCase(),
      title: channel.title === 'Github' ? 'GitHub' : channel.title === 'Whatsapp' ? 'WhatsApp' : channel.title,
      link: channel.link,
      icon: channel.icon ?? 'bx bx-link',
    }));

  setLanguage(language: 'en' | 'es'): void {
    this.translate.use(language).subscribe({
      error: (error: unknown) => {
        console.error(`Unable to load the "${language}" translations.`, error);
      },
    });
  }
}
