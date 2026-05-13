import { Component, inject } from '@angular/core';
import { LocaleService, SupportedLocale } from '../../../core/services/locale.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <div class="lang-switch">
      <button type="button"
              [class.active]="locale.current() === 'fr-CM'"
              (click)="switch('fr-CM')">FR</button>
      <span class="sep">|</span>
      <button type="button"
              [class.active]="locale.current() === 'en-CM'"
              (click)="switch('en-CM')">EN</button>
    </div>
  `,
  styles: [`
    .lang-switch { display: inline-flex; align-items: center; font-size: 14px; }
    .lang-switch button {
      background: none; border: 0; cursor: pointer; padding: 4px 8px;
      color: #666; font-weight: 600; font-family: inherit;
    }
    .lang-switch button.active { color: #1F4E79; text-decoration: underline; }
    .sep { color: #ccc; }
  `]
})
export class LanguageSwitcher {
  locale = inject(LocaleService);

  switch(l: SupportedLocale): void {
    this.locale.switch(l);
  }
}
