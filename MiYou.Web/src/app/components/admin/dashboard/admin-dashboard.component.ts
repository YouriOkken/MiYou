import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin-dashboard.component.html',
    styleUrl: 'admin-dashboard.component.scss',
    imports: [CommonModule, LottieComponent],
})

export class AdminDashboardComponent implements OnInit {
    loggedIn!: boolean;
    vibeAnimation: AnimationOptions = {
        path: 'assets/animations/Animation-1751043542524.json',
        loop: true,
        autoplay: true,
    };

    documentAnimation: AnimationOptions = {
        path: 'assets/animations/x2TgacpwGU.json',
        loop: true,
        autoplay: true,
    };

    statisticsAnimation: AnimationOptions = {
        path: 'assets/animations/vv6FzhR2Ph.json',
        loop: true,
        autoplay: true,
    };

    timeAnimation: AnimationOptions = {
        path: 'assets/animations/time.json',
        loop: true,
        autoplay: true,
    };

    scheduleAnimation: AnimationOptions = {
        path: 'assets/animations/Schedule.json',
        loop: true,
        autoplay: true,
    };

    earningsAnimation: AnimationOptions = {
        path: 'assets/animations/earnings.json',
        loop: true,
        autoplay: true,
    };
    expensesAnimation: AnimationOptions = {
        path: 'assets/animations/expenses.json',
        loop: true,
        autoplay: true,
    };

    employeesAnimation: AnimationOptions = {
        path: 'assets/animations/employees.json',
        loop: true,
        autoplay: true,
    };

    constructor() { }

    ngOnInit() {
    }
}