import { Injectable } from '@angular/core';
import { Auth as AuthService} from './auth';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private router: Router
  ) {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const tokenizeReq = token ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;
    return next.handle(tokenizeReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 400 && error.error.msg && (error.error.msg.includes('fue cambiada') || error.error.msg.includes('expirado'))) {
          this.authService.logout();
          this.router.navigateByUrl('/login');
        };
        return throwError(() => error);
      })
    );
  };

}
