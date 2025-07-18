import { Component, OnInit } from '@angular/core';
import { TemplatesComponent } from "./sections/templates.component";

@Component({
    selector: 'pricing-and-templates-component',
    templateUrl: 'pricing-and-templates.component.html',
    styleUrl: 'pricing-and-templates.component.scss',
    imports: [TemplatesComponent]
})

export class PricingAndTemplatesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}