import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private showBannerSubject = new BehaviorSubject<boolean>(this.shouldShowBanner());
  showBanner$ = this.showBannerSubject.asObservable();

  setShowBanner(v: boolean) {
    this.showBannerSubject.next(v);
  }

  private shouldShowBanner(): boolean {
    if (typeof window === 'undefined') return false; // SSR safeguard
    return !localStorage.getItem('cookieConsent');
  }

  static loadGoogleAnalytics(trackingID: string): void {
    if (document.querySelector(`script[src*="${trackingID}"]`)) {
      return; // voorkomen dat het dubbel geladen wordt
    }

    const gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${trackingID}`);

    const gaScript2 = document.createElement('script');
    gaScript2.innerText = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }

      gtag('js', new Date());
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
      gtag('config', '${trackingID}');
    `;

    document.head.appendChild(gaScript);
    document.head.appendChild(gaScript2);
  }

  static clearGoogleAnalytics(): void {
    // Disable GA permanently on this session
    (window as any)['ga-disable-G-08YN1E27MX'] = true;
    
    // delete the cookies from google analytics
    const allCookies = document.cookie.split(';');
    const cookiesToDelete = allCookies
      .map(cookie => cookie.trim().split('=')[0])
      .filter(name => name.startsWith('_ga'));

    const domainParts = window.location.hostname.split('.');

    for (let i = 0; i < domainParts.length - 1; i++) {
      const domain = '.' + domainParts.slice(i).join('.');
      cookiesToDelete.forEach(name => {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
      });
    }

    cookiesToDelete.forEach(name => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
    });
  }
}