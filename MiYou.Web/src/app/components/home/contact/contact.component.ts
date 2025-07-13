import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact/contact.service';
import { CreateContactRequest } from '../../../models/contact/create/create-contact-request.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'contact-component',
    templateUrl: 'contact.component.html',
    styleUrl: "contact.component.scss",
    imports: [FormsModule]
})

export class ContactComponent implements OnInit {
    name: string = "";
    companyName: string = "";
    email: string = "";
    idea: string = "";
    additionalInfo?: string;

    constructor(private readonly contactService: ContactService) { }

    ngOnInit() { }

    async sendContact() {
        debugger;
        var request: CreateContactRequest = {
            name: this.name,
            companyName: this.companyName,
            email: this.email,
            idea: this.idea,
            additionalInfo: this.additionalInfo
        }
        var response = await this.contactService.create(request);
    }
}