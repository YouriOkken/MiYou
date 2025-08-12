import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  initLanguage(): Promise<void> {
    return new Promise((resolve) => {
      this.translate.addLangs(['en', 'nl']);
      this.translate.setDefaultLang('en');

      let langToUse = 'en';

      if (isPlatformBrowser(this.platformId)) {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang) {
          langToUse = savedLang;
        } else {
          const browserLang = (navigator.language || '').slice(0, 2).toLowerCase();
          langToUse = (browserLang === 'nl') ? 'nl' : 'en';
        }
      }

      this.translate.use(langToUse).subscribe(() => {
        resolve();
      });
    });
  }
}