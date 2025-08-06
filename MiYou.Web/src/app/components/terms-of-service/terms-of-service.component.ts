import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getAnimation } from '../../utilities/animations/animation.utilities';
import { animationTypes } from '../../utilities/enums/animationTypes.enum';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'terms-of-service-component',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
  imports: [RouterModule, LottieComponent, TranslateModule]
})
export class TermsOfServiceComponent {
  termsOfServiceAnimation: AnimationOptions;
    
  constructor() 
  { 
    this.termsOfServiceAnimation = getAnimation(animationTypes.termsOfService, true, true);
  }

  ngOnInit() { }
}
