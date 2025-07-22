import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookiesService } from '../../services/cookies/cookies.service';

@Component({
    selector: 'cookies-component',
    templateUrl: 'cookies.component.html',
    styleUrl: 'cookies.component.scss',
    imports: [RouterModule]
})

export class CookiesComponent implements OnInit {
    constructor(private cookiesService: CookiesService) { }

    ngOnInit() { }

    openManageModal(event: Event) : void {
        event.preventDefault();
        this.cookiesService.setShowBanner(true);
    }
}