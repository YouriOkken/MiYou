import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'about-component',
    templateUrl: 'about.component.html',
    styleUrl: "about.component.scss",
    imports: [TranslateModule]
})

export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}