import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class TwittxHttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private _cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      setHeaders: {
        'X-Jwt-Token':
          'Bearer ' + this._cookieService.getCookie(window.location.hostname),
      },
    });
    return next.handle(clonedRequest);
  }
}
