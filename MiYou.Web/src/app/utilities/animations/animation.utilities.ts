import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import loadingAnimationData from '../../../assets/animations/loading.json';
import errorAnimationData from '../../../assets/animations/failure.json';
import contactSendAnimationData from '../../../assets/animations/email_sent.json';
import { animationTypes } from "../enums/animationTypes.enum";

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
    }
}