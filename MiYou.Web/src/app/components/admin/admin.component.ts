import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "./login/login.component";

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html',
    styleUrl: 'admin.component.scss',
    imports: [LoginComponent],
})

export class AdminComponent implements OnInit {
    loggedIn: boolean = false;

    constructor() { }

    ngOnInit() { }
}