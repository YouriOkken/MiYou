import { PaymentStatus } from "../../../utilities/enums/paymentStatus.enum";

export interface ClientResponse{
    id: number,
    fullName: string,
    clientSince: Date,
    contactPerson: string,
    active: boolean,
    paymentStatus: PaymentStatus
}

export interface ClientListResponse{
    clientList: ClientResponse[];
}