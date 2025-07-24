import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'process-component',
    templateUrl: 'process.component.html',
    styleUrl: "process.component.scss",
    imports: [LottieComponent, TranslateModule]
})

export class ProcessComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    step1Animation: AnimationOptions = {
        path: 'assets/animations/Animation-1751043394845.json',
        loop: true,
        autoplay: true,
    };

    step2Animation: AnimationOptions = {
        path: 'assets/animations/Animation-1751043542524.json',
        loop: true,
        autoplay: true,
    };

    step3Animation: AnimationOptions = {
        path: 'assets/animations/Animation-1751044110812.json',
        loop: true,
        autoplay: true,
    };
}