import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class VentaService {

    public url: string;
    private headers = new HttpHeaders().set('Content-type', 'application/json');

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    listar(): Observable<any> {
        return this._http.get(`${this.url}ventas`, { headers: this.headers });
    }

    registrarTransaccional(ventaDTO): Observable<any> {
        let params = JSON.stringify(ventaDTO);
        return this._http.post(`${this.url}ventas`, params, { headers: this.headers });
    }
}