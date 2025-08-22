import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { AccountInfoResponse } from "../../models/admin/dashboard/account-info.response";
import { AnalyticsResponse } from "../../models/admin/analytics/analytics.response.model";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  constructor(private readonly http: HttpClient) { }

  async getAccountInfo() {
    return await firstValueFrom(this.http.get<AccountInfoResponse>(`${this.apiUrl}/getAccountInfo`, { withCredentials: true }));
  }

  async getAllAnalytics(): Promise<AnalyticsResponse> {
    return await firstValueFrom(this.http.get<AnalyticsResponse>(`${this.apiUrl}/analytics`, { withCredentials: true }));
  }
}