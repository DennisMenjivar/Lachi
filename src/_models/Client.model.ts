export class Client {
    id: number;
    name: string;
    telephone: string;
    address: string;
    email: string;

    constructor(pID: number, pName: string, pTelephone: string, pAddress: string, pEmail: string) {
        this.id = pID;
        this.name = pName;
        this.address = pAddress;
        this.email = pEmail;
    }
}