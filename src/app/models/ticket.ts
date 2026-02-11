import { DetalleTicket } from "./detalle-ticket";

export class Ticket {
    _id!: string;
    nro_ticket!: number;
    id_cliente!: string;
    fecha_compra!: Date;
    total!: number;
    estado!: string;
    detalles_ticket!: DetalleTicket[];
}
