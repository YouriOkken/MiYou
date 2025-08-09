import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideLottieOptions } from 'ngx-lottie';
import { provideHttpClient, withFetch, HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './utilities/factories/http-loader.factory'; // pas pad aan indien nodig
import { LanguageService } from './services/language/language.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LanguageInterceptor } from './interceptors/language.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export function appInitializerFactory(languageService: LanguageService) {
  return () => languageService.initLanguage();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    LanguageService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [LanguageService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};
