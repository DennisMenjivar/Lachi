export class DiariaDetalle {
    id: number;
    id_control: number;
    number: number;
    lempiras: number;
    id_client: number;
    client: string;
    date: string;
    status: number;
    id_closure: number;
    paid: number;

    constructor(id: number, id_control: number, number: number, lempiras: number, id_client: number, client: string, date: string, status: number, id_closure: number, paid: number) {
        this.id = id;
        this.id_control = id_control;
        this.number = number;
        this.lempiras = lempiras;
        this.id_client = id_client;
        this.client = client;
        this.date = date;
        this.status = status;
        this.id_closure = id_closure;
        this.paid = paid;
    }


    toStringReceiptView(): string {
        return String("ID:" + this.id) + " - ID_Control: " + String(this.id_control) + " - Número:" + String(this.number) + " - Lempiras:" + String(this.lempiras) + " - Client:" + this.client + "\n";
    }
}