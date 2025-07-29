import { Component, OnInit } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { ProcessComponent } from "./process/process.component";
import { ContactComponent } from "./contact/contact.component";
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrl: "home.component.scss",
    imports: [AboutComponent, ProcessComponent, ContactComponent, LottieComponent, TranslateModule]
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