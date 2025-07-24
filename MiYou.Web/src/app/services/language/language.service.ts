import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  initLanguage(): Promise<void> {
    return new Promise((resolve) => {
      const defaultLang = 'nl';
      this.translate.addLangs(['en', 'nl']);
      this.translate.setDefaultLang(defaultLang);

      let langToUse = defaultLang;
      if (isPlatformBrowser(this.platformId)) {
        const savedLang = localStorage.getItem('selectedLang');
        if (savedLang) {
          langToUse = savedLang;
        }
      }

      // use() returned Observable wordt pas afgerond als taal geladen is
      this.translate.use(langToUse).subscribe(() => {
        resolve();
      });
    });
  }
}
