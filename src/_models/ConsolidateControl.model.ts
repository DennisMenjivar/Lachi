export class ConsolidateControl {
    id: number;
    id_user: number;
    user: string;
    date: string;
    kind: number;
    total: number;
    status: number;
    id_closure: number;

    constructor(id: number, id_user: number, user: string, date: string, kind: number, total: number, status: number, id_closure: number) {
        this.id = id;
        this.id_user = id_user;
        this.user = user;
        this.date = date;
        this.kind = kind;
        this.total = total;
        this.status = status;
        this.id_closure = id_closure;
    }
}