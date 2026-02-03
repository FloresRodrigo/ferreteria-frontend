import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Registro } from './components/registro/registro';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: 'login',
        component: Login
    }
];
