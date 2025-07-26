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
}