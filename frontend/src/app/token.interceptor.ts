import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import {AuthService} from "./service/auth.service";
import {Observable, of} from 'rxjs';
import {catchError} from "rxjs/internal/operators";
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepted");
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Basic ' + this.auth.getToken(),
    });

    const clone = request.clone({headers});
    return next.handle(clone).pipe(catchError((error, caught) => {
      if (error.status === 401) {
        this.auth.setToken('');
        this.router.navigate([`/login`]);
      }
      return of(error);
    }) as any);
  }
}
