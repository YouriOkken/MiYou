export interface CreateContactRequest {
    name: string,
    companyName: string | undefined,
    email: string,
    idea: string,
    additionalInfo: string | undefined
}