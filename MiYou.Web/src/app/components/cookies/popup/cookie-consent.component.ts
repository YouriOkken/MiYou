import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'cookie-consent-component',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
  imports: [RouterModule]
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cookiesService: CookiesService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.cookiesService.showBanner$.subscribe(value => {
      this.showBanner = value;
    })
    if (this.isBrowser) {
      const consent = localStorage.getItem('cookieConsent');
      console.log('cookieConsent in localStorage:', consent);
      this.showBanner = !consent;
    }
  }

  acceptAll() {
    debugger;
    if (this.isBrowser) {
      if (localStorage.getItem('cookieConsent') === "all") {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });

        (window as any).gtag('config', environment.googleAnalyticsId);
      }
      localStorage.setItem('cookieConsent', 'all');
      this.loadAnalytics();
      this.showBanner = false;
      // window.location.reload();
    }
  }

  acceptNecessaryOnly() {
    debugger;
    if (this.isBrowser) {
      if (localStorage.getItem('cookieConsent') === "all") {
        this.stopAnalytics();
      }
      localStorage.setItem('cookieConsent', 'necessary');
      this.showBanner = false;
    }
  }

  stopAnalytics() {
    if (!(window as any).gtag) return;

    (window as any).gtag('consent', 
      'update', {
        analytic_storage: 'denied'
      });
  }

    loadAnalytics() {
      if (!this.isBrowser) return;

      // Check of script al is toegevoegd
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        this.initGtag();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.googleAnalyticsId}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        this.initGtag();
      };
    }

    initGtag() {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag; // zodat gtag globaal beschikbaar is

      gtag('js', new Date());
      gtag('config', environment.googleAnalyticsId);
    }
}
