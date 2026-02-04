import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth as AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Usuario as UsuarioModel} from '../../models/usuario';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  login = "";
  password = "";
  msgLogin = signal<string>("");
  loading = signal<boolean>(false);

  constructor(private authService: AuthService,
              private router: Router
  ) {};

  loginUsuario() {
    this.msgLogin.set("");
    if(!this.login || !this.password) {
      this.msgLogin.set("Debe ingresar todos los campos");
      return;
    };
    this.loading.set(true);
    this.authService.login(this.login, this.password)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe(
      (result:any) => {
        const usuario = Object.assign(new UsuarioModel, result.data);
        this.authService.persistirSesion(usuario);
        this.router.navigateByUrl('');
      },
      (error:any) => {
        this.msgLogin.set(error.error.msg || "Error del servidor");
      }
    );
  };
}
