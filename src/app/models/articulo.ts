export class Articulo {
    _id!: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    total_vendido: number;

    constructor() {
        this.nombre = "";
        this.descripcion = "";
        this.imagen = "";
        this.precio = 0;
        this.stock = 0;
        this.total_vendido = 0;
    };
}
