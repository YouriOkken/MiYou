import { Component, OnInit } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { ProcessComponent } from "./process/process.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrl: "home.component.scss",
    imports: [AboutComponent, ProcessComponent, ContactComponent, FooterComponent, LottieComponent]
})

export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    homePageAnimation: AnimationOptions = {
        path: 'assets/animations/Animation-1751057494670.json',
        loop: true,
        autoplay: true,
    };
}