import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LoginRequest } from '../../../models/admin/auth/login/login-request.model';
import { AuthService } from '../../../services/admin/auth/auth.service';
import { getErrorMessage } from '../../../utilities/error/error.utilities';
import { Router } from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss',
    imports: [FormsModule],
})

export class LoginComponent implements OnInit {
    request: LoginRequest = {
        email: '',
        password: ''
    }
    isLoading: boolean = false;
    errorMessage!: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    async login() {
        try {
            this.isLoading = true;
            await this.authService.login(this.request);
            this.isLoading = false;
            this.router.navigate(['admin/dashboard']);
        } catch (error: any) {
            this.errorMessage = getErrorMessage(error);
            this.isLoading = false;
        }
    }
}