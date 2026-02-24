import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Stats {
  private url = API_CONFIG.baseUrl+'/'+API_CONFIG.endpoints.stats;

  constructor(private _http: HttpClient) {};

  public getStats(): Observable<any> {
    return this._http.get(this.url);
  };
}
