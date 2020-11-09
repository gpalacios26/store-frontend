import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { GenericService } from './generic.service';
import { GLOBAL } from './global';

@Injectable()
export class ProductoService extends GenericService<Producto> {

    constructor(protected http: HttpClient) {
        super(
            http,
            `${GLOBAL.url}/productos`
        );
    }
}