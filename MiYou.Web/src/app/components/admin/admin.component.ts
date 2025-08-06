import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { AuthService } from '../../services/admin/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html',
    styleUrl: 'admin.component.scss',
    imports: [CommonModule],
})

export class AdminComponent implements OnInit {
    loggedIn!: boolean;
    initialized = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { 
        // this.authService.currentUser$.subscribe((user) => {
        //     this.loggedIn = user != null;
        // });
    }
}