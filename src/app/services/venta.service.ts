import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class VentaService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getVentas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'ventas', { headers: headers });
    }

    createVenta(ventaDTO): Observable<any> {
        let params = JSON.stringify(ventaDTO);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'ventas', params, { headers: headers });
    }
}