import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { animationTypes } from '../../../utilities/enums/animationTypes.enum';
import { getAnimation } from '../../../utilities/animations/animation.utilities';

@Component({
    selector: 'process-component',
    templateUrl: 'process.component.html',
    styleUrl: "process.component.scss",
    imports: [LottieComponent, TranslateModule]
})

export class ProcessComponent implements OnInit {

    astronautWavingPlanetAnimation: AnimationOptions;
    astronautTypingAnimation: AnimationOptions;
    astronautWavingSpaceshipAnimation: AnimationOptions;

    constructor() {

        this.astronautWavingPlanetAnimation = getAnimation(animationTypes.astronautWavingPlanet, true, true);
        this.astronautTypingAnimation = getAnimation(animationTypes.astronautTyping, true, true);
        this.astronautWavingSpaceshipAnimation = getAnimation(animationTypes.astronautWavingSpaceship, true, true);
    }

    ngOnInit() { }

}