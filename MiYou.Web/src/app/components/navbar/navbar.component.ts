import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: "navbar.component.scss",
    imports: [RouterModule]
})

export class NavbarComponent implements OnInit {
    menuOpen = false;

    constructor(private eRef: ElementRef) { }

    ngOnInit() { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;

        // Check of de klik buiten de nav of hamburger was
        if (
            this.menuOpen &&
            !this.eRef.nativeElement.contains(target)
        ) {
            this.menuOpen = false;
        }
    }
}