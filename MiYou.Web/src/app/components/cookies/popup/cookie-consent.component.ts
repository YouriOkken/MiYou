import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ModalComponent } from "../../../modal/modal.component";
import { SwitchComponent } from "../../switch/switch.component";
import { TranslateModule } from '@ngx-translate/core';

declare var gtag: Function;
@Component({
  selector: 'cookie-consent-component',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  imports: [RouterModule, ModalComponent, SwitchComponent, TranslateModule]
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  isBrowser: boolean;
  necessaryCookies: boolean = true;
  AllCookies: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookiesService: CookiesService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.cookiesService.showBanner$.subscribe(v => this.showBanner = v);

    if (this.isBrowser) {
      const consent = localStorage.getItem('cookieConsent');

      if (consent === 'all') {
        this.AllCookies = true;
        this.acceptAll();
      }
    }
  }

  handleSave() {
    if (this.AllCookies) {
      this.acceptAll();
    } else if (this.necessaryCookies) {
      this.acceptNecessaryOnly();
    } else {
      this.acceptNecessaryOnly(); // fallback
    }
  }

  acceptAll() {
    if (!this.isBrowser) return;
    localStorage.setItem('cookieConsent', 'all');
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
    gtag('config', 'G-08YN1E27MX');
    this.showBanner = false;
    this.cookiesService.setShowBanner(false);
  }

  acceptNecessaryOnly() {
    if (!this.isBrowser) return;
    localStorage.setItem('cookieConsent', 'necessary');
    this.showBanner = false;
    this.cookiesService.setShowBanner(false);
  }
}
