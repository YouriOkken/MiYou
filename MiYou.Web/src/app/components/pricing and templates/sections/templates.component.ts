import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'templates-component',
    templateUrl: 'templates.component.html',
    styleUrl: 'templates.component.scss',
    imports: [TranslateModule]
})

export class TemplatesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}