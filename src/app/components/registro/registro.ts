import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth as AuthService } from '../../services/auth';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = "";
  username = "";
  email = "";
  password = "";
  msgRegistro = signal<string>("");
  msgOk = signal<boolean>(false);
  loading = signal<boolean>(false);

  constructor(private authService: AuthService) {};

  registrarUsuario(form: NgForm) {
    this.msgRegistro.set("");
    if(!this.nombre?.trim() || !this.username?.trim() || !this.email?.trim() || !this.password?.trim()) {
      this.msgRegistro.set("Debe ingresar todos los campos");
      return;
    };
    this.loading.set(true);
    this.authService.register(this.nombre, this.username, this.email, this.password)
    .pipe(finalize(() => (this.loading.set(false))))
    .subscribe(
      (result:any) => {
        this.msgOk.set(true);
        this.msgRegistro.set(result.msg);
        form.resetForm();
      },
      (error:any) => {
        this.msgOk.set(false);
        this.msgRegistro.set(error.error.msg || "Error del servidor");
      }
    );
  };
}
