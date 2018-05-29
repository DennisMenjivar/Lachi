export class ConsolidateDetalle {
    id: number;
    id_control: number;
    number: number;
    lempiras: number;
    date: string;
    status: number;
    id_closure: number;

    constructor(id: number, id_control: number, number: number, lempiras: number, date: string, status: number, id_closure: number) {
        this.id = id;
        this.id_control = id_control;
        this.number = number;
        this.lempiras = lempiras;
        this.date = date;
        this.status = status;
        this.id_closure = id_closure;
    }
}