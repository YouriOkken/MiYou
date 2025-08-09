import { AnimationItem } from "lottie-web";
import { AnimationOptions } from "ngx-lottie";
import { animationTypes } from "../enums/animationTypes.enum";

import astronautFloatingAnimationData from '../../../assets/animations/astronaut-floating.animation.json';
import astronautTypingAnimationData from '../../../assets/animations/astronaut-typing.animation.json';
import astronautWavingPlanetAnimationData from '../../../assets/animations/astronaut-waving-planet.animation.json';
import astronautWavingSpaceshipAnimationData from '../../../assets/animations/astronaut-waving-spaceship.animation.json';
import clockAnimationData from '../../../assets/animations/clock.animation.json';
import cookiesAnimationData from '../../../assets/animations/cookies.animation.json';
import createDocumentAnimationData from '../../../assets/animations/create-document.animation.json';
import privacyPolicyAnimationData from '../../../assets/animations/document-security.animation.json';
import termsOfServiceAnimationData from "../../../assets/animations/document.animation.json";
import earningsAnimationData from "../../../assets/animations/earnings.animation.json";
import contactSendAnimationData from '../../../assets/animations/email-sent.animation.json';
import employeesAnimationData from '../../../assets/animations/employees.animation.json';
import errorAnimationData from '../../../assets/animations/error.animation.json';
import expensesAnimationData from '../../../assets/animations/expenses.animation.json';
import loadingAnimationData from '../../../assets/animations/loading.animation.json';
import moneyStackAnimationData from '../../../assets/animations/money-stack.animation.json';
import notFoundAnimationData from "../../../assets/animations/not-found.animation.json";
import scheduleAnimationData from '../../../assets/animations/schedule.animation.json';
import statisticsAnimationData from '../../../assets/animations/statistics.animation.json';

export function onAnimationCreated(animationItem: AnimationItem, speed: number): void {
    animationItem.setSpeed(speed);
}

export function getAnimation(type: animationTypes, loop: boolean, autoPlay: boolean): AnimationOptions {
    switch (type) {
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
            };

        case animationTypes.privacy:
            return {
                animationData: privacyPolicyAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.notFound:
            return {
                animationData: notFoundAnimationData,
                loop: loop,
                autoplay: autoPlay
            };

        case animationTypes.termsOfService:
            return {
                animationData: termsOfServiceAnimationData,
                loop: loop,
                autoplay: autoPlay
            };
        case animationTypes.astronautFloating:
            return {
                animationData: astronautFloatingAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.astronautTyping:
            return {
                animationData: astronautTypingAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.astronautWavingPlanet:
            return {
                animationData: astronautWavingPlanetAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.astronautWavingSpaceship:
            return {
                animationData: astronautWavingSpaceshipAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.clock:
            return {
                animationData: clockAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.createDocument:
            return {
                animationData: createDocumentAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.earnings:
            return {
                animationData: earningsAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.employees:
            return {
                animationData: employeesAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.expenses:
            return {
                animationData: expensesAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.moneyStack:
            return {
                animationData: moneyStackAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.schedule:
            return {
                animationData: scheduleAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };

        case animationTypes.statistics:
            return {
                animationData: statisticsAnimationData,
                loop: loop,
                autoplay: autoPlay,
            };
    }
}