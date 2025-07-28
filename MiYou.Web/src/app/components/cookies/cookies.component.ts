import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookiesService } from '../../services/cookies/cookies.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { getAnimation } from '../../utilities/animations/animation.utilities';
import { animationTypes } from '../../utilities/enums/animationTypes.enum';

@Component({
    selector: 'cookies-component',
    templateUrl: 'cookies.component.html',
    styleUrl: 'cookies.component.scss',
    imports: [RouterModule, LottieComponent]
})

export class CookiesComponent implements OnInit {
    cookiesAnimation: AnimationOptions;
    
    constructor(private cookiesService: CookiesService) 
    { 
        this.cookiesAnimation = getAnimation(animationTypes.cookies, true, true);
    }

    ngOnInit() { }

    openManageModal(event: Event) : void {
        event.preventDefault();
        this.cookiesService.setShowBanner(true);
    }
}