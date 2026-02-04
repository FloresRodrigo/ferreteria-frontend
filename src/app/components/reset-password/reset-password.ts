import { Component, OnInit, signal } from '@angular/core';
import { Auth as AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit{
  password = "";
  msgReset = signal<string>("");
  loading = signal<boolean>(false);
  token: string | null = null;

  constructor(private authService: AuthService,
              private route: ActivatedRoute
  ) {};

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  resetPassword() {
    this.msgReset.set("");
    if (!this.token) {
      this.msgReset.set('Token inválido');
      return;
    }
    if(!this.password) {
      this.msgReset.set("Ingrese su nueva contraseña");
      return;
    };
    this.loading.set(true);
    this.authService.resetPassword(this.token, this.password)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe(
      (result:any) => {
        this.msgReset.set(result.msg);
      },
      (error:any) => {
        this.msgReset.set(error.error.msg || "Error del servidor");
      }
    );
  };
}
