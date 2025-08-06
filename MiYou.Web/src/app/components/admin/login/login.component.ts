import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LoginRequest } from '../../../models/admin/auth/login/login-request.model';
import { AuthService } from '../../../services/admin/auth/auth.service';
import { getErrorMessage } from '../../../utilities/error/error.utilities';

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

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    async login() {
        try {
            this.isLoading = true;
            await this.authService.login(this.request);
            this.isLoading = false;
            console.log("ingelogd!");
        } catch (error: any) {
            this.isLoading = false;
            console.log(getErrorMessage(error));
        }
    }
}