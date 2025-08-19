import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientListResponse, ClientResponse } from '../../../models/admin/client/client.response';
import { ClientService } from '../../../services/admin/client/client.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { getAnimation } from '../../../utilities/animations/animation.utilities';
import { animationTypes } from '../../../utilities/enums/animationTypes.enum';
import { FormsModule } from '@angular/forms';
import { PaymentStatus } from '../../../utilities/enums/paymentStatus.enum';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'clients-component',
    templateUrl: 'clients.component.html',
    styleUrl: 'clients.component.scss',
    imports: [RouterModule, FormsModule, LottieComponent, CommonModule]
})

export class ClientsComponent implements OnInit {
    cubeLoadingAnimation: AnimationOptions;
    noDataAnimation: AnimationOptions;
    isLoading = false;
    searchInput: string = '';

    clientListResponse: ClientListResponse = { clientList: [] };

    constructor(private readonly clientService: ClientService) {
        this.cubeLoadingAnimation = getAnimation(animationTypes.cubeLoading, true, true);
        this.noDataAnimation = getAnimation(animationTypes.noData, true, true);
    }

    async ngOnInit() {
        this.isLoading = true;
        this.clientListResponse = await this.clientService.getAllClients();
        this.isLoading = false;
    }

    get filteredClients() {
        if (!this.searchInput) return this.clientListResponse.clientList;
        const term = this.searchInput.toLowerCase();
        return this.clientListResponse.clientList.filter(client =>
            client.fullName.toLowerCase().includes(term) ||
            client.id.toString().includes(term) ||
            client.contactPerson?.toLowerCase().includes(term)
        );
    }

    getPaymentStatus(client: ClientResponse): { text: string, class: string } {
        switch (client.paymentStatus) {
            case PaymentStatus.paid:
                return { text: 'Betaald', class: 'status-paid' };
            case PaymentStatus.pending:
                return { text: 'In afwachting', class: 'status-pending' };
            case PaymentStatus.overdue:
                return { text: 'Achterstalling', class: 'status-overdue' };
            case PaymentStatus.notInitiated:
                return { text: 'Niks verzonden', class: 'status-not-initiated' };
            default:
                return { text: 'Onbekend', class: 'status-unkown' };
        }
    }

    getActiveText(active: boolean): string {
        return active ? 'Ja' : 'Nee';
    }
}