import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth as AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  user: any;

  constructor(public authService: AuthService,
              private router: Router
  ) {};

  isAdmin(): boolean {
    return this.authService.isAdmin();
  };

  isLogged(): boolean {
    return this.authService.isLogged();
  };

  userLogged() {
    this.user = this.authService.userLogged();
  };

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('');
  };
}
