import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Currency } from './currency';

@Injectable()
export class CurrencyService {

    private _url = "http://localhost:5000/currencies";
    constructor(private _http: Http) { }

    getCurrencies(): Promise<Currency[]> {
        var url = this._url;

        return this._http.get(url)
            .toPromise()
            .then(resp => resp.json() as Currency[])
            .catch(this.handleError);
        
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}


