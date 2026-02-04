import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth as AuthService} from './auth';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router
  ) {};

  canActivate(): boolean {
    if(!this.authService.isLogged()) {
      this.router.navigateByUrl('/login');
      return false;
    };
    if(!this.authService.isAdmin()) {
      this.router.navigateByUrl('');
      return false;
    };
    return true;
  };
}
