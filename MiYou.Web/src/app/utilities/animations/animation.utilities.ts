import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import { animationTypes } from "../enums/animationTypes.enum";

import loadingAnimationData from '../../../assets/animations/loading.json';
import errorAnimationData from '../../../assets/animations/failure.json';
import contactSendAnimationData from '../../../assets/animations/email_sent.json';
import cookiesAnimationData from '../../../assets/animations/cookies.json';
import privacyPolicyAnimationData from '../../../assets/animations/document_security.json';
import notFoundAnimationData from "../../../assets/animations/not-found.json";

export function onAnimationCreated(animationItem: AnimationItem, speed: number): void {
    animationItem.setSpeed(speed);
}

export function getAnimation(type: animationTypes, loop: boolean, autoPlay: boolean): AnimationOptions {
    switch(type) {
        case animationTypes.loading:
            return {
                animationData: loadingAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.error:
            return {
                animationData: errorAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };
        
        case animationTypes.contactSend:
            return {
                animationData: contactSendAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };
        
        case animationTypes.cookies:
            return {
                animationData: cookiesAnimationData,
                loop: loop,
                autoplay: autoPlay,
            }

        case animationTypes.privacy:
            return {
                animationData: privacyPolicyAnimationData,
                loop: loop,
                autoplay: autoPlay,
            }

        case animationTypes.notFound:
            return {
                animationData: notFoundAnimationData,
                loop: loop,
                autoplay: autoPlay
            };
    }
}