import { Component, OnInit } from '@angular/core';
import { Demo1Component } from "./demo1/demo1.component";

@Component({
    selector: 'demos-component',
    templateUrl: 'demos.component.html',
    styleUrl: 'demos.component.scss',
    imports: [Demo1Component]
})

export class DemosComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}