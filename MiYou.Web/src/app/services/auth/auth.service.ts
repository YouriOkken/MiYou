import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/auth/login/login-request.model';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { LoginResponse } from '../../models/auth/login/login-response.model';
import { LogoutRequest } from '../../models/auth/logout-request.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly apiUrl = `${environment.apiUrl}/auth`;

    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    async loadUserFromServer() {
        try {
            const user = await firstValueFrom(this.http.get<LoginResponse>(`${this.apiUrl}/getCurrentUser`, { withCredentials: true }));
            this.currentUserSubject.next(user);
        } catch (error: any) {
            if (error.status === 401) {
                try {
                    await firstValueFrom(this.http.post(`${this.apiUrl}/refresh`, {}, { withCredentials: true }));

                    const user = await firstValueFrom(
                        this.http.get<LoginResponse>(`${this.apiUrl}/getCurrentUser`, { withCredentials: true })
                    );

                    this.currentUserSubject.next(user);
                } catch (refreshError) {
                    this.currentUserSubject.next(null);
                }
            } else {
                this.currentUserSubject.next(null);
            }
        }
    }

    async login(request: LoginRequest) {
        const user = await firstValueFrom(this.http.post<LoginResponse>(`${this.apiUrl}/login`, request, { withCredentials: true }));
        this.currentUserSubject.next(user);
        return user;
    }

    async logout() {
        const request: LogoutRequest = {};
        await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, request, { withCredentials: true }));
        this.currentUserSubject.next(null);
    }
}