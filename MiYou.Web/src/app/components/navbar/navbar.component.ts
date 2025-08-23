import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: 'navbar.component.scss',
    imports: [RouterModule, TranslateModule]
})
export class NavbarComponent implements OnInit {
    menuOpen = false;
    languageDropdownOpen = false;
    currentLanguage: string;
    loggedIn: boolean = false;

    constructor(private eRef: ElementRef, private translate: TranslateService, private authService: AuthService) {
        this.currentLanguage = this.translate.currentLang || 'en';
    }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;

        if (this.menuOpen && !this.eRef.nativeElement.contains(target)) {
            this.menuOpen = false;
        }

        if (this.languageDropdownOpen && !this.eRef.nativeElement.contains(target)) {
            this.languageDropdownOpen = false;
        }
    }

    toggleLanguageDropdown(event: Event) {
        event.stopPropagation();
        this.languageDropdownOpen = !this.languageDropdownOpen;
    }

    setLanguage(lang: string) {
        this.translate.use(lang);
        this.currentLanguage = lang;
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('selectedLang', lang);
        }
        this.languageDropdownOpen = false;
    }

    async logout() {
        await this.authService.logout();
    }
}
