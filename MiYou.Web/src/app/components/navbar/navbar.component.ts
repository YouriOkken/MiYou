import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'nav-component',
    templateUrl: 'navbar.component.html',
    styleUrl: "navbar.component.scss",
    imports: [RouterModule]
})

export class NavbarComponent implements OnInit {
    menuOpen = false;

    constructor() { }

    ngOnInit() { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}