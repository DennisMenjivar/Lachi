export class DataChica {
    id: number;
    lempiras: number;
    number: number;
    idClient: number;
    client: string;
    fecha: Date;

    constructor(pID: number, pLempiras: number, pNumber: number, pIdClient: number, pClient: string, pFecha: Date) {
        this.id = pID;
        this.lempiras = pLempiras;
        this.number = pNumber;
        this.idClient = pIdClient;
        this.client = pClient;
        this.fecha = pFecha;
    }

}