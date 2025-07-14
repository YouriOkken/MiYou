import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CreateContactRequest } from "../../models/contact/create/create-contact-request.model";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
    private readonly apiUrl = 'https://localhost:5001/contact';
    
    constructor (private readonly http: HttpClient) {}

    async create(request: CreateContactRequest){
        return await firstValueFrom(this.http.post<CreateContactRequest>(`${this.apiUrl}/create`, request, {}))
    }
}