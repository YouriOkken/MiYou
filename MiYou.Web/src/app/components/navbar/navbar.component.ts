import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: 'navbar.component.scss',
    imports: [RouterModule, TranslateModule]
})
export class NavbarComponent {
    menuOpen = false;
    languageDropdownOpen = false;
    currentLanguage: string;
    loggedIn: boolean = false;

    constructor(private eRef: ElementRef, private translate: TranslateService) {
        this.currentLanguage = this.translate.currentLang || 'en';
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
}
