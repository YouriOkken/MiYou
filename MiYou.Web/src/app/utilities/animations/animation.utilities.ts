import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import loadingAnimationData from '../../../assets/animations/loading.json';
import errorAnimationData from '../../../assets/animations/failure.json';
import { animationTypes } from "../enums/animationTypes.enum";

export function onAnimationCreated(animationItem: AnimationItem, speed: number): void {
    animationItem.setSpeed(speed);
}

export function getAnimation(type: animationTypes, loop: boolean): AnimationOptions {
    switch(type) {
        case animationTypes.loading:
            return {
                animationData: loadingAnimationData,
                loop: loop,
                autoplay: true,
            };

        case animationTypes.error:
            return {
                animationData: errorAnimationData,
                loop: loop,
                autoplay: true,
            };
    }
}