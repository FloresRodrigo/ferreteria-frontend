import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { AuthGuard } from './services/auth-guard';
import { GuestGuard } from './services/guest-guard';
import { AdminGuard } from './services/admin-guard';
import { Inventario } from './components/inventario/inventario';
import { InventarioForm } from './components/inventario-form/inventario-form';
import { Compra } from './components/compra/compra';
import { Carrito } from './components/carrito/carrito';
import { Pago } from './components/pago/pago';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'registro', canActivate: [GuestGuard], component: Registro },
  { path: 'login', canActivate: [GuestGuard], component: Login },
  { path: 'forgot-password', canActivate: [GuestGuard], component: ForgotPassword },
  { path: 'reset-password', canActivate: [GuestGuard], component: ResetPassword },
  { path: 'inventario', canActivate: [AdminGuard], component: Inventario },
  { path: 'inventario-form', canActivate: [AdminGuard], component: InventarioForm},
  { path: 'inventario-form/:id', canActivate: [AdminGuard], component: InventarioForm},
  { path: 'compra', canActivate: [AuthGuard], component: Compra},
  { path: 'carrito', canActivate: [AuthGuard], component: Carrito},
  { path: 'pago/:estado', canActivate: [AuthGuard], component: Pago}
];
