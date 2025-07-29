import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = this.translateService.currentLang || 'nl';

    const clonedRequest = req.clone({
      setHeaders: {
        'Accept-Language': lang
      }
    });

    return next.handle(clonedRequest);
  }
}
