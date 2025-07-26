import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ModalComponent } from "../../../modal/modal.component";
import { SwitchComponent } from "../../switch/switch.component";

@Component({
  selector: 'cookie-consent-component',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  imports: [RouterModule, ModalComponent, SwitchComponent]
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
        this.loadAnalytics();
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
    (window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' });
    this.loadAnalytics();
    this.showBanner = false;
    this.cookiesService.setShowBanner(false);
  }

  acceptNecessaryOnly() {
    if (!this.isBrowser) return;
    localStorage.setItem('cookieConsent', 'necessary');
    this.showBanner = false;
    this.cookiesService.setShowBanner(false);
  }

  loadAnalytics() {
    if (!this.isBrowser) return;
  
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      this.initGtag(true);  // true = config direct uitvoeren
      return;
    }
  
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      this.initGtag(true); // config pas aanroepen ná load
    };
  }

  initGtag(shouldConfig = false) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());

    if (shouldConfig) {
      gtag('config', environment.googleAnalyticsId, { anonymize_ip: true });
    }
  }
}
