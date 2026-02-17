export class Usuario {
    _id!: string;
    nombre_completo: string;
    username: string;
    email: string;
    estado: string;
    rol:string;
    lastLogin!: Date;
    passwordChangedAt!: Date;
    deleteRequestedAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;

    constructor() {
        this.nombre_completo = "";
        this.username = "";
        this.email = "";
        this.estado = "";
        this.rol = "";
    };
}