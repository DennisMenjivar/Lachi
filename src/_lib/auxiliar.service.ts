import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DataChica } from '../_models/DataChica.model';

@Injectable()
export class AuxiliarService {

    chicas: DataChica[];
    constructor(private _http: Http) {
    }

    //  current_api: string = "http://creaxisapi.creaxis.xyz/";
    //current_api: string = "http://localhost:8081/";
    //current_api: string = "http://localhost:56782/";

    /* Funciones para Interaccion con Web API */
    objectToParams(f: any) {
        var tparams: URLSearchParams = new URLSearchParams();

        for (var key in f) {
            if (f.hasOwnProperty(key)) {
                let val = f[key];
                tparams.set(key, val);
            }
        }

        return tparams;
    }
}