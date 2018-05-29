export class Pedazo {
    id: number;
    number: number;
    pedazos: number;
    id_closure: number;

    constructor(pId: number, pNumber: number, pPedazos: number, id_closure: number) {
        this.id = pId;
        this.number = pNumber;
        this.pedazos = pPedazos;
        this.id_closure = id_closure;
    }
}