import { Component, OnInit } from '@angular/core';
import { TemplatesComponent } from "./sections/templates.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'pricing-and-templates-component',
    templateUrl: 'pricing-and-templates.component.html',
    styleUrl: 'pricing-and-templates.component.scss',
    imports: [TemplatesComponent, TranslateModule]
})

export class PricingAndTemplatesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}