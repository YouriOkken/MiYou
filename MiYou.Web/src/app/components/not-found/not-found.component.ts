import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { getAnimation } from '../../utilities/animations/animation.utilities';
import { animationTypes } from '../../utilities/enums/animationTypes.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'not-found-component',
    templateUrl: 'not-found.component.html',
    styleUrl: 'not-found.component.scss',
    imports: [LottieComponent, TranslateModule]
})

export class NotFoundComponent implements OnInit {
    notFoundAnimation: AnimationOptions;
    
    constructor(private router: Router) {
        this.notFoundAnimation = getAnimation(animationTypes.notFound, true, true);
    }
    
    ngOnInit() { }

    redirectToHome() {
        this.router.navigate(['']);
    }
}