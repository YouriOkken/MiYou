import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { AccountInfoResponse } from "../../models/admin/dashboard/account-info.response";

@Injectable({
  providedIn: 'root'
})

export class AdminService {
    private readonly apiUrl = `${environment.apiUrl}/admin`;
    
    constructor (private readonly http: HttpClient) {}

    async getAccountInfo(){
        return await firstValueFrom(this.http.get<AccountInfoResponse>(`${this.apiUrl}/getAccountInfo`, {withCredentials: true}))
    }
}