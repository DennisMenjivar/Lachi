export class Closure {
    id: number;
    description: string;
    date: string;
    status: number;
    total: number;
    id_user: number;
    user: string;
    winningNumber: number;
    totalWinning: number;

    constructor(id: number, description: string, date: string, status: number, total: number, id_user: number, user: string, winningNumber: number, totalWinning: number) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.status = status;
        this.total = total;
        this.id_user = id_user;
        this.user = user;
        this.winningNumber = winningNumber;
        this.totalWinning = totalWinning;
    }
}