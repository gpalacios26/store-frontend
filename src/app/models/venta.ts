import { Persona } from './persona';

export class Venta {
    constructor(
        public idVenta: number,
        public fecha: any,
        public persona: any,
        public importe: number
    ) { }
}