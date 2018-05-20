export class DataChica {
    id: number;
    lempiras: number;
    number: number;
    idClient: number;
    client: string;
    fecha: Date;
    status: number;

    constructor(pID: number, pLempiras: number, pNumber: number, pIdClient: number, pClient: string, pFecha: Date, pStatus: number) {
        this.id = pID;
        this.lempiras = pLempiras;
        this.number = pNumber;
        this.idClient = pIdClient;
        this.client = pClient;
        this.fecha = pFecha;
        this.status = pStatus;
    }

    toStringDC(): string {
        return String(this.id) + " - " + String(this.number) + " - " + String(this.lempiras) + " - " + this.client + "\n";
    }

}