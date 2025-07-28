import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: "navbar.component.scss",
    imports: [RouterModule, TranslateModule]
})

export class NavbarComponent {
    menuOpen = false;
    languageDropdownOpen = false;

    constructor(private eRef: ElementRef, private translate: TranslateService) { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    //kijk of er clicks buiten de menu's zijn geweest om ze te sluiten. geldt voor hamburger en translate menu
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;

        if (
            this.menuOpen &&
            !this.eRef.nativeElement.contains(target)
        ) {
            this.menuOpen = false;
        }

        if (
            this.languageDropdownOpen &&
            !this.eRef.nativeElement.contains(target)
        ) {
            this.languageDropdownOpen = false;
        }
    }


    toggleLanguageDropdown(event: Event) {
        event.stopPropagation(); //voorkomt dat de dropdown zich instant sluit
        this.languageDropdownOpen = !this.languageDropdownOpen;
    }

    setLanguage(lang: string) {
        this.translate.use(lang);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('selectedLang', lang);
        }
        this.languageDropdownOpen = false;
    }
}