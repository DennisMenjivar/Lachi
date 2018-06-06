import { DiariaDetalle } from "./DiariaDetalle.model";

export class DiariaControl {
    id: number;
    id_client: number;
    client: string;
    total: number;
    date: string;
    status: number;
    detalle: DiariaDetalle[];
    id_closure: number;

    constructor(id: number, id_client: number, client: string, total: number, id_closure: number) {
        this.id = id;
        this.id_client = id_client;
        this.client = client;
        this.total = total;
        this.date = '';
        this.status = 0;
        this.detalle = [];
        this.id_closure = id_closure;
    }

    toStringToReceiptView(): string {
        return String("Ticket # " + this.id + "-" + this.id_closure + " -Cliente: " + this.client + "\n")
    }

    toStringNormal(): string {
        return "ID: " + this.id + " ID Cliente: " + this.id_client + " Cliente: " + this.client + " Total: " + this.total + " Estado: " + this.status;
    }
}