import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { GenericService } from './generic.service';
import { GLOBAL } from './global';

@Injectable()
export class PersonaService extends GenericService<Persona> {

    constructor(protected http: HttpClient) {
        super(
            http,
            `${GLOBAL.url}/personas`
        );
    }
}