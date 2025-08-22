import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-my-chart',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  imports: [CommonModule, ChartModule]
})
export class AnalyticsComponent implements OnInit {
  analyticsData: any[] = [];
  realtimeActiveUsers: number = 0;

  chartType: 'pie' | 'doughnut' | 'bar' | 'line' | 'polarArea' | 'radar' = 'pie';

  chartDataCountry: any;
  chartOptionsCountry: any;

  chartDataBrowser: any;
  chartOptionsBrowser: any;

  chartDataPage: any;
  chartOptionsPage: any;

  statsCards: { title: string; value: string, small: string }[] = [];

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    const analytics = await this.adminService.getAllAnalytics();
    this.analyticsData = analytics.reportData;
    this.realtimeActiveUsers = analytics.realtimeActiveUsers;

    if (this.analyticsData && this.analyticsData.length > 0) {
      this.loadAllCharts();
      this.loadStatsCards();
    }
  }

  loadAllCharts() {
    const countryData = this.groupByField(this.analyticsData, 'country', 'Aantal gebruikers per land');
    this.chartDataCountry = this.buildChartData(countryData);
    this.chartOptionsCountry = this.buildChartOptions('Aantal gebruikers per land');

    const browserData = this.groupByField(this.analyticsData, 'browser', 'Sessies per browser', 'sessions');
    this.chartDataBrowser = this.buildChartData(browserData);
    this.chartOptionsBrowser = this.buildChartOptions('Sessies per browser');

    const pageData = this.groupByField(this.analyticsData, 'pagePath', 'Top pagina\'s', 'screenPageViews');
    this.chartDataPage = this.buildChartData(pageData);
    this.chartOptionsPage = this.buildChartOptions('Top pagina\'s');
  }

  loadStatsCards() {
    const totalUsers = this.analyticsData.reduce((sum, row) => sum + (Number(row.totalUsers) || 0), 0);
    const totalSessions = this.analyticsData.reduce((sum, row) => sum + (Number(row.sessions) || 0), 0);
    const totalPageViews = this.analyticsData.reduce((sum, row) => sum + (Number(row.screenPageViews) || 0), 0);
    const avgPagesPerSession = totalSessions > 0 ? (totalPageViews / totalSessions) : 0;

    const totalBounces = this.analyticsData.reduce((sum, row) =>
      sum + ((Number(row.sessions) || 0) * ((Number(row.bounceRate) || 0) / 100)), 0
    );
    const bounceRate = totalSessions > 0 ? (totalBounces / totalSessions) * 100 : 0;

    this.statsCards = [
      { title: 'Totaal gebruikers', value: totalUsers.toLocaleString(), small: this.getSmallText(1) },
      { title: 'Totaal sessies', value: totalSessions.toLocaleString(), small: this.getSmallText(2) },
      { title: 'Actieve gebruikers', value: this.realtimeActiveUsers.toLocaleString(), small: this.getSmallText(3) },
      { title: 'Gem. pagina’s/sessie', value: avgPagesPerSession.toFixed(2), small: this.getSmallText(4) },
      { title: 'Bounce rate', value: `${bounceRate.toFixed(2)}%`, small: this.getSmallText(5) }
    ];
  }

  getSmallText(type: number): string {
    switch (type) {
      case 1:
        return "Hoeveel gebruikers in bepaalde periode (elk apparaat of browser wordt maar 1 keer meegeteld per gebruiker)";
      case 2:
        return "Hoeveel gebruikers voor de 1e keer op de site";

      case 3:
        return "Aantal actieve gebruikers";

      case 4:
        return "Percentage van gebruikers die weggegaan zijn zonder ergens op te klikken (hoe lager hoe beter)";

      case 5:
        return "Hoelang duurt een bezoek gemiddeld?";
    }
    return "";
  }

  buildChartData(dataList: { type: string, value: number }[]) {
    const labels = dataList.map(item => item.type);
    const values = dataList.map(item => item.value);

    return {
      labels,
      datasets: [
        {
          label: 'Aantal',
          backgroundColor: this.getRandomColors(labels.length),
          borderColor: '#1E88E5',
          data: values,
        }
      ]
    };
  }

  private groupByField(
    data: any[],
    field: string,
    _title: string,
    metric: 'totalUsers' | 'sessions' | 'screenPageViews' = 'totalUsers'
  ): { type: string, value: number }[] {
    const grouped: { [key: string]: number } = {};

    for (const row of data) {
      const key = row[field] || 'Onbekend';
      const val = Number(row[metric]) || 0;
      grouped[key] = (grouped[key] || 0) + val;
    }

    const mainGroups: { [key: string]: number } = {};
    let otherTotal = 0;

    for (const key in grouped) {
      if (grouped[key] < 3) {
        otherTotal += grouped[key];
      } else {
        mainGroups[key] = grouped[key];
      }
    }

    if (otherTotal > 0) {
      mainGroups['Overig'] = otherTotal;
    }

    return Object.keys(mainGroups).map(key => ({
      type: key,
      value: mainGroups[key]
    }));
  }

  buildChartOptions(title: string) {
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${title} (${this.formatDate('2025-07-01')} - ${this.formatDate(new Date())})`,
          color: '#fff',
          font: {
            size: 16,
            weight: 'bold',
          }
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
    };
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

    return Array.from({ length: num }, (_, i) => predefinedColors[i % predefinedColors.length]);
  }

  formatDate(date: string | Date) {
    const d = new Date(date);
    return d.toLocaleDateString('nl-NL', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}