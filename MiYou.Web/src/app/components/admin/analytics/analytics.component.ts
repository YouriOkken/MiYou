import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AdminService } from '../../../services/admin/admin.service';
import { AnalyticsDataType } from '../../../utilities/enums/analytics.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-chart',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  imports: [CommonModule, ChartModule, FormsModule]
})
export class AnalyticsComponent implements OnInit {
  analyticsData: any[] = [];

  selectedDataType: AnalyticsDataType = AnalyticsDataType.usersPerCountry;

  analyticsDataTypeOptions = [
    { label: 'Gebruikers per land', value: AnalyticsDataType.usersPerCountry },
    { label: 'Devices', value: AnalyticsDataType.devices },
    { label: 'Browsers', value: AnalyticsDataType.browsers },
  ];

  chartType: 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar' = 'pie';
  chartTypes = ['bar', 'line', 'pie', 'doughnut', 'polarArea', 'radar'] as const;
  chartTitle: string = "Aantal gebruikers per land";
  chartData: any;
  chartOptions: any;

  constructor(private adminService: AdminService) {
    this.updateChartOptions();
  }

  async ngOnInit() {
    this.analyticsData = await this.adminService.getAllAnalytics();
    debugger;
    if (this.analyticsData && this.analyticsData.length > 0) {
      this.updateChartData();
    }
  }

  onDataDropdownChange(value: AnalyticsDataType) {
    this.updateChartData();
  }

  ngOnChanges() {
    if (this.analyticsData && this.analyticsData.length > 0) {
      this.updateChartData();
    }
  }

  updateChartData() {
    const dataList = this.getSelectedData();

    const labels = dataList.map(item => item.type);
    const totalUsers = dataList.map(item => item.totalUsers);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Total Users',
          backgroundColor: this.getRandomColors(labels.length),
          borderColor: '#1E88E5',
          data: totalUsers,
        }
      ]
    };
  }

  getSelectedData(): { type: string, totalUsers: number }[] {
    switch (this.selectedDataType) {
      case 0:
        return this.groupByField(this.analyticsData, 'country', "Aantal gebruikers per land");
      case 1:
        return this.groupByField(this.analyticsData, 'deviceCategory', "Aantal gebruikers per device");
      case 2:
        return this.groupByField(this.analyticsData, 'browser', "Aantal gebruikers per browser");
      default:
        return [];
    }
  }

  private groupByField(data: any[], field: string, title: string): { type: string, totalUsers: number }[] {
    this.chartTitle = title;
    this.updateChartOptions();

    const grouped: { [key: string]: number } = {};

    for (const row of data) {
      const key = row[field] || 'Onbekend';
      const users = Number(row.totalUsers) || 0;
      grouped[key] = (grouped[key] || 0) + users;
    }

    // Scheid de keys met minder dan 3 gebruikers
    const mainGroups: { [key: string]: number } = {};
    let otherTotal = 0;

    for (const key in grouped) {
      if (grouped[key] < 3) {
        otherTotal += grouped[key];
      } else {
        mainGroups[key] = grouped[key];
      }
    }

    // Voeg de 'Overig' groep toe als er users zijn onder 3
    if (otherTotal > 0) {
      mainGroups['Overig'] = otherTotal;
    }

    return Object.keys(mainGroups).map(key => ({
      type: key,
      totalUsers: mainGroups[key]
    }));
  }

  getRandomColors(num: number): string[] {
    const predefinedColors = [
      '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
      '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
      '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
      '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC',
      '#FF6347', '#4682B4', '#9ACD32', '#FF69B4', '#00CED1',
      '#D2691E', '#6495ED', '#8A2BE2', '#5F9EA0', '#FF4500'
    ];

    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(predefinedColors[i % predefinedColors.length]);
    }
    return colors;
  }

  updateChartOptions() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${this.chartTitle} (${this.formatDate('2025-07-01')} - ${this.formatDate(new Date())})`
        },
        legend: {
          display: false,
          position: 'top',
          labels: {
            color: '#fff',
          },
        },
        tooltip: { enabled: true },
      },
      scales: {
        x: { ticks: { color: '#fff' } },
        y: { beginAtZero: true, ticks: { color: '#fff' } },
      },
      backgroundColor: '#444',
    };
  }

  formatDate(date: string | Date) {
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
