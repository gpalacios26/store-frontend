import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GenericService<T> {

    private headers = new HttpHeaders().set('Content-type', 'application/json');

    constructor(
        protected http: HttpClient,
        @Inject(String) protected url: string
    ) { }

    listar(): Observable<any> {
        return this.http.get<T[]>(this.url, { headers: this.headers });
    }

    listarPorId(id: number): Observable<any> {
        return this.http.get<T>(`${this.url}/${id}`, { headers: this.headers });
    }

    registrar(t: T): Observable<any> {
        let params = JSON.stringify(t);
        return this.http.post(this.url, params, { headers: this.headers });
    }

    modificar(t: T): Observable<any> {
        let params = JSON.stringify(t);
        return this.http.put(this.url, params, { headers: this.headers });
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}`, { headers: this.headers });
    }

}
