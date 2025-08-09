import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
    private readonly apiUrl = `${environment.apiUrl}/admin`;
    
    constructor (private readonly http: HttpClient) {}

    async getAllAnalytics(): Promise<any[]> {
      return await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/analytics`, { withCredentials: true }));
    }
}