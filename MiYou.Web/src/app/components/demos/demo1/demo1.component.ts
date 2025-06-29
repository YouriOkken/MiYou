import { Component, OnInit } from '@angular/core';
import { Demo1NavbarComponent } from "./navbar/demo1-navbar.component";

@Component({
    selector: 'demo1-component',
    templateUrl: 'demo1.component.html',
    styleUrl:  'demo1.component.scss',
    imports: [Demo1NavbarComponent]
})

export class Demo1Component implements OnInit {
    constructor() { }

    ngOnInit() { }
}