import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { AuthGuard } from './services/auth-guard';
import { GuestGuard } from './services/guest-guard';
import { AdminGuard } from './services/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'registro', canActivate: [GuestGuard], component: Registro },
  { path: 'login', canActivate: [GuestGuard], component: Login },
  { path: 'forgot-password', canActivate: [GuestGuard], component: ForgotPassword },
  { path: 'reset-password', canActivate: [GuestGuard], component: ResetPassword }
];
