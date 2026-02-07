import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Articulo {
  private url = API_CONFIG.baseUrl+'/'+API_CONFIG.endpoints.articulo;

  constructor(private _http: HttpClient) {};

  public top10Articulos(): Observable<any> {
    return this._http.get(this.url+'/top10');
  };

  public getArticulos(): Observable<any> {
    return this._http.get(this.url);
  };

  public getInventario(params:any):Observable<any> {
    return this._http.get(this.url+'/inventario', { params });
  };

  public createArticulo(articulo:FormData): Observable<any> {
    return this._http.post(this.url+'/inventario', articulo);
  };

  public getArticuloAdmin(id:string): Observable<any> {
    return this._http.get(this.url+'/inventario/'+id);
  };

  public updateArticulo(id:string, articulo:FormData): Observable<any> {
    return this._http.put(this.url+'/inventario/'+id, articulo);
  };

  public deleteArticulo(id:string): Observable<any> {
    return this._http.delete(this.url+'/inventario/'+id);
  };

  public getArticuloPublic(id:string): Observable<any> {
    return this._http.get(this.url+'/'+id);
  };
}
