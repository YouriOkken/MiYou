import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'admin-analytics-component',
    templateUrl: 'analytics.component.html',
    styleUrl: "analytics.component.scss",
    imports: [CommonModule]
})

export class AnalyticsComponent implements OnInit {
    analyticsData: any[] = [];

    constructor(private adminService: AdminService) { }

    async ngOnInit() {
      this.analyticsData = await this.adminService.getAllAnalytics();
    }
}