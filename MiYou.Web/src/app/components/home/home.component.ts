import { Component, OnInit } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { ProcessComponent } from "./process/process.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrl: "home.component.scss",
    imports: [AboutComponent, ProcessComponent, ContactComponent, FooterComponent]
})

export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}