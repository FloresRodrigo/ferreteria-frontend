import { Component, OnInit, signal } from '@angular/core';
import { Auth as AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario as UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-set-password',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './set-password.html',
  styleUrl: './set-password.css',
})
export class SetPassword implements OnInit {
  password = signal<string>('');
  msg = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private authService: AuthService,
              private router: Router,
              private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getMyProfile().subscribe(
      (result:any) => {
        if(!result.data.isGoogle) {
          this.router.navigateByUrl('');
          return;
        };
      },
      (_error:any) => {
        this.router.navigateByUrl('/login');
      }
    );
  }

  setPassword() {
    this.msg.set('');
    if (!this.password) {
      this.msg.set('Ingrese una contraseña');
      return;
    }
    this.loading.set(true);
    this.authService.setPasswordGoogle(this.password())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(
        (result:any) => {
          alert(result.msg + '\nPor seguridad, debes iniciar sesión nuevamente');
          this.authService.logout();
          this.router.navigateByUrl('/login');
        },
        (error:any) => {
          this.msg.set(error.error.msg || "Error del servidor");
        }
      );
  };
}
