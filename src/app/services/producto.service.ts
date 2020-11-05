import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class ProductoService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getProductos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'productos', { headers: headers });
    }

    getProducto(productoId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'productos/' + productoId, { headers: headers });
    }

    createProducto(producto): Observable<any> {
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'productos', params, { headers: headers });
    }

    updateProducto(producto): Observable<any> {
        let params = JSON.stringify(producto);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.put(this.url + 'productos', params, { headers: headers });
    }

    deleteProducto(productoId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.delete(this.url + 'productos/' + productoId, { headers: headers });
    }
}