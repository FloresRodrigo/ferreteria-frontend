import { Component, signal } from '@angular/core';
import { Auth as AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  email = "";
  msgPassword = signal<string>("");
  loading = signal<boolean>(false);

  constructor(private authService: AuthService) {};

  forgotPassword() {
    this.msgPassword.set("");
    if(!this.email){
      this.msgPassword.set("Ingrese su email");
      return;
    };
    this.loading.set(true);
    this.authService.forgotPassword(this.email)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe(
      (result:any) => {
        this.msgPassword.set(result.msg);
      },
      (error:any) => {
        this.msgPassword.set(error.error.msg || "Error del servidor");
      }
    );
  };
}
