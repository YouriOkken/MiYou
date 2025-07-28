import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'footer-component',
    templateUrl: 'footer.component.html',
    styleUrl: "footer.component.scss",
    imports: [RouterModule]
    styleUrl: "footer.component.scss",
    imports: [TranslateModule]
})

export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}