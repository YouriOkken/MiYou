import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "../../modal/modal.component";
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { getAnimation } from '../../utilities/animations/animation.utilities';
import { animationTypes } from '../../utilities/enums/animationTypes.enum';

@Component({
    selector: 'not-found-component',
    templateUrl: 'not-found.component.html',
    styleUrl: 'not-found.component.scss',
    imports: [LottieComponent]
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