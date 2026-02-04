import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth as AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router
  ) {};

  canActivate(): boolean {
    if(this.authService.isLogged()) {
      this.router.navigateByUrl('');
      return false;
    };
    return true;
  };
}
