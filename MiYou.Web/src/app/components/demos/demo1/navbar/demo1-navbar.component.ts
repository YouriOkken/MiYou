import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'demo1-nav-component',
    templateUrl: 'demo1-navbar.component.html',
    styleUrl: "demo1-navbar.component.scss",
    imports: [RouterModule]
})

export class Demo1NavbarComponent implements OnInit {
    menuOpen = false;

    constructor() { }

    ngOnInit() { }
}