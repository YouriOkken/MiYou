import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getAnimation } from '../../utilities/animations/animation.utilities';
import { animationTypes } from '../../utilities/enums/animationTypes.enum';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'privacy-policy-component',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  imports: [RouterModule, LottieComponent, TranslateModule]
})
export class PrivacyPolicyComponent {
  privacyPolicyAnimation: AnimationOptions;
    
  constructor() 
  { 
    this.privacyPolicyAnimation = getAnimation(animationTypes.privacy, true, true);
  }

  ngOnInit() { }
}
