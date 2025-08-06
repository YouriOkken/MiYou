import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { AuthService } from '../../services/admin/auth/auth.service';

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html',
    styleUrl: 'admin.component.scss',
    imports: [LoginComponent],
})

export class AdminComponent implements OnInit {
    loggedIn: boolean = false;

    constructor(private authService: AuthService) { }

    async ngOnInit() { 
        this.authService.currentUser$.subscribe((user) => {
            this.loggedIn = user != null;
        });
    }
}