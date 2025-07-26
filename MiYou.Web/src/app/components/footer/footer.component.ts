import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'footer-component',
    templateUrl: 'footer.component.html',
    styleUrl: "footer.component.scss",
    imports: [RouterModule]
})

export class FooterComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}