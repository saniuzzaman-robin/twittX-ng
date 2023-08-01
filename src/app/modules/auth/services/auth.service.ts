import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login, LoginResponse } from '../models/auth.model';
import { tap } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}
  login(data: Login): Promise<LoginResponse | any> {
    let httpHeader = new HttpHeaders({
      name: 'Content-Type',
      value: 'application/json',
      id: 'pair_440bc96814454acd8c25ac71f2d43075',
    });
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(environment?.loginUrl, data, { headers: httpHeader })
        .pipe(
          tap((res: any) => {
            if (res?.token) {
              this._cookieService.setCookie(
                window.location.hostname,
                res?.token,
                10
              );
              console.log('cookie set');
            }
          })
        )
        .subscribe(
          (res: any) => {
            resolve(true);
          },
          error => {
            reject(error?.error);
          }
        );
    });
  }
}
