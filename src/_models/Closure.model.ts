export class Closure {
    id: number;
    description: number;
    date: string;
    status: number;
    total: number;
    id_user: number;
    user: number;
    winningNumber: number;

    constructor(id: number, description: number, date: string, status: number, total: number, id_user: number, user: number, winningNumber: number) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.status = status;
        this.total = total;
        this.id_user = id_user;
        this.user = user;
        this.winningNumber = winningNumber;
    }
}