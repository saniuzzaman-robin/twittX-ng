import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwittxQueryService {
  constructor(private _httpClient: HttpClient) {}
  executeAsync(url: string, headers?: any): Observable<any> {
    return this._httpClient.get(url, { headers: headers });
  }
}
