import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { animationTypes } from '../../../utilities/enums/animationTypes.enum';
import { getAnimation } from '../../../utilities/animations/animation.utilities';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin-dashboard.component.html',
    styleUrl: 'admin-dashboard.component.scss',
    imports: [CommonModule, LottieComponent]
})

export class AdminDashboardComponent implements OnInit {
    loggedIn!: boolean;

    astronautTypingAnimation: AnimationOptions;
    createDocumentAnimation: AnimationOptions;
    statisticsAnimation: AnimationOptions;
    timeAnimation: AnimationOptions;
    scheduleAnimation: AnimationOptions;
    earningsAnimation: AnimationOptions;
    expensesAnimation: AnimationOptions;
    employeesAnimation: AnimationOptions;

    constructor() {
        this.astronautTypingAnimation = getAnimation(animationTypes.astronautTyping, true, true);
        this.createDocumentAnimation = getAnimation(animationTypes.createDocument, true, true);
        this.statisticsAnimation = getAnimation(animationTypes.statistics, true, true);
        this.timeAnimation = getAnimation(animationTypes.clock, true, true);
        this.scheduleAnimation = getAnimation(animationTypes.schedule, true, true);
        this.earningsAnimation = getAnimation(animationTypes.earnings, true, true);
        this.expensesAnimation = getAnimation(animationTypes.expenses, true, true);
        this.employeesAnimation = getAnimation(animationTypes.employees, true, true);
    }

    ngOnInit() {
    }
}   