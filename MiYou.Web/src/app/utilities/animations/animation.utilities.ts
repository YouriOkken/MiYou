import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";

export function onAnimationCreated(animationItem: AnimationItem, speed: number): void {
    animationItem.setSpeed(speed);
}

export enum animationTypes {
    loading,
    error
}

export function getAnimation(type: animationTypes, loop: boolean): AnimationOptions {
    switch(type) {
        case animationTypes.loading:
            return {
                path: 'assets/animations/loading.json',
                loop: loop,
                autoplay: true,
            };

        case animationTypes.error:
            return {
                path: 'assets/animations/failure.json',
                loop: loop,
                autoplay: true,
            };
    }
}