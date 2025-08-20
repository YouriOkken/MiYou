import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { animationTypes } from '../../../utilities/enums/animationTypes.enum';
import { getAnimation } from '../../../utilities/animations/animation.utilities';
import { AdminService } from '../../../services/admin/admin.service';
import { AccountInfoResponse } from '../../../models/admin/dashboard/account-info.response';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin-dashboard.component.html',
    styleUrl: 'admin-dashboard.component.scss',
    imports: [CommonModule, LottieComponent, RouterModule]
})

export class AdminDashboardComponent implements OnInit {
    loggedIn!: boolean;
    accountInfo: AccountInfoResponse = { firstName: '', lastName: '' };

    astronautTypingAnimation: AnimationOptions;
    createDocumentAnimation: AnimationOptions;
    statisticsAnimation: AnimationOptions;
    timeAnimation: AnimationOptions;
    scheduleAnimation: AnimationOptions;
    earningsAnimation: AnimationOptions;
    expensesAnimation: AnimationOptions;
    employeesAnimation: AnimationOptions;
    clientsAnimation: AnimationOptions;
    allDocumentsAnimation: AnimationOptions;

    constructor(private readonly adminService: AdminService) {
        this.astronautTypingAnimation = getAnimation(animationTypes.astronautTyping, true, true);
        this.createDocumentAnimation = getAnimation(animationTypes.createDocument, true, true);
        this.statisticsAnimation = getAnimation(animationTypes.statistics, true, true);
        this.timeAnimation = getAnimation(animationTypes.clock, true, true);
        this.scheduleAnimation = getAnimation(animationTypes.schedule, true, true);
        this.earningsAnimation = getAnimation(animationTypes.earnings, true, true);
        this.expensesAnimation = getAnimation(animationTypes.expenses, true, true);
        this.employeesAnimation = getAnimation(animationTypes.employees, true, true);
        this.clientsAnimation = getAnimation(animationTypes.clients, true, true);
        this.allDocumentsAnimation = getAnimation(animationTypes.allDocuments, true, true);
    }

    async ngOnInit() {
        this.accountInfo = await this.adminService.getAccountInfo();
    }
}   