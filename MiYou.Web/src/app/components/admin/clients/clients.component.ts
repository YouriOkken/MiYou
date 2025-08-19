import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'clients-component',
    templateUrl: 'clients.component.html',
    styleUrl: 'clients.component.scss',
    imports: [RouterModule]
})

export class ClientsComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}