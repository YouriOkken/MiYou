import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CookiesService {
    private showBannerSubject = new BehaviorSubject<boolean>(true);
    showBanner$ = this.showBannerSubject.asObservable();

    setShowBanner(value: boolean) {
        this.showBannerSubject.next(value);
    }
}