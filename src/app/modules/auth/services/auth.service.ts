import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Login,
  LoginResponse,
  Register,
  RegisterResponse,
} from '../models/auth.model';
import { Subject, tap, BehaviorSubject } from 'rxjs';
import { CookieService } from './cookie.service';
import jwt_decode from 'jwt-decode';
export type LoggedInUser = {
  username: string;
  id: number;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser: BehaviorSubject<LoggedInUser> = new BehaviorSubject({
    username: '',
    id: 1,
  });
  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService
  ) {}
  login(data: Login): Promise<LoginResponse | any> {
    const httpHeader = new HttpHeaders({
      name: 'Content-Type',
      value: 'application/json',
      id: 'pair_440bc96814454acd8c25ac71f2d43075',
    });
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(environment?.commandQueryUrls.login, data, {
          headers: httpHeader,
        })
        .pipe(
          tap((res: any) => {
            if (res?.token) {
              const decodedToken: any = jwt_decode(res?.token);
              this.loggedInUser.next({
                username: data.email.split('@')[0],
                id: decodedToken?.id,
              });
              this._cookieService.setCookie(
                window.location.hostname,
                res?.token,
                decodedToken?.exp
              );
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
  register(data: Register): Promise<RegisterResponse | any> {
    const httpHeader = new HttpHeaders({
      name: 'Content-Type',
      value: 'application/json',
      id: 'pair_440bc96814454acd8c25ac71f2d43075',
    });
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(environment?.commandQueryUrls.register, data, {
          headers: httpHeader,
        })
        .pipe(
          tap((res: any) => {
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
