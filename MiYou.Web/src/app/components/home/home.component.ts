import { Component, OnInit } from '@angular/core';
import { AboutComponent } from "./about/about.component";
import { ProcessComponent } from "./process/process.component";
import { ContactComponent } from "./contact/contact.component";
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';
import { SkillsSectionComponent } from "./skills/skills-section.component";


@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrl: "home.component.scss",
    imports: [AboutComponent, ProcessComponent, ContactComponent, LottieComponent, TranslateModule, SkillsSectionComponent]
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