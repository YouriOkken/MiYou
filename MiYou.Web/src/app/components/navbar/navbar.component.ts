import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: "navbar.component.scss"
})

export class NavbarComponent implements OnInit {
    menuOpen = false;

    constructor() { }

    ngOnInit() { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}