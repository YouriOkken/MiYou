import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ClientListResponse } from "../../../models/admin/client/client.response";

@Injectable({
  providedIn: 'root'
})

export class ClientService {
    private readonly apiUrl = `${environment.apiUrl}/client`;
    
    constructor (private readonly http: HttpClient) {}

    async getAllClients(){
        return await firstValueFrom(this.http.get<ClientListResponse>(`${this.apiUrl}/getAllClients`, {withCredentials: true}))
    }
}