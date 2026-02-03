export class Usuario {
    _id!: string;
    nombre_completo: string;
    username: string;
    email: string;

    constructor() {
        this.nombre_completo = "";
        this.username = "";
        this.email = "";
    };
}