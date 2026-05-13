import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LOCALE_KEY = 'blogsite_locale';

export type SupportedLocale = 'fr-CM' | 'en-CM';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private translate = inject(TranslateService);

  public readonly current = signal<SupportedLocale>(this.loadInitial());

  init(): void {
    const supported: SupportedLocale[] = ['fr-CM', 'en-CM'];
    this.translate.addLangs(supported);
    this.translate.setDefaultLang('fr');
    const initial = this.current();
    this.translate.use(this.toShort(initial));
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.toShort(initial);
    }
  }

  switch(locale: SupportedLocale): void {
    this.current.set(locale);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, locale);
    }
    this.translate.use(this.toShort(locale));
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.toShort(locale);
    }
  }

  private toShort(locale: SupportedLocale): string {
    return locale.split('-')[0];
  }

  private loadInitial(): SupportedLocale {
    if (typeof localStorage === 'undefined') {
      return 'fr-CM';
    }
    const stored = localStorage.getItem(LOCALE_KEY) as SupportedLocale | null;
    if (stored === 'fr-CM' || stored === 'en-CM') {
      return stored;
    }
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toLowerCase().startsWith('en') ? 'en-CM' : 'fr-CM';
    }
    return 'fr-CM';
  }
}
