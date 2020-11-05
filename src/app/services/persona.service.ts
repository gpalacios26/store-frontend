import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class PersonaService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    getPersonas(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'personas', { headers: headers });
    }

    getPersona(personaId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'personas/' + personaId, { headers: headers });
    }

    createPersona(persona): Observable<any> {
        let params = JSON.stringify(persona);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'personas', params, { headers: headers });
    }

    updatePersona(persona): Observable<any> {
        let params = JSON.stringify(persona);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.put(this.url + 'personas', params, { headers: headers });
    }

    deletePersona(personaId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.delete(this.url + 'personas/' + personaId, { headers: headers });
    }
}