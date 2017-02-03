import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Plan} from './plan';

@Injectable()
export class PlanService {

    private _url = "http://localhost:5000/plans";
    constructor(private _http: Http) { }

    getPlans(filter?: any): Promise<Plan[]> {
        var url = this._url;
        if (filter && filter.userId)
            url += "?userId=" + filter.userId;

        return this._http.get(url)
            .toPromise()
            .then(resp => resp.json() as Plan[]);
    }

    getComments(postId: string): Promise<any[]> {
        return this._http.get(this._url + "/" + postId + "/comments")
            .toPromise()
            .then(resp => resp.json() as any[]);
    }

    addPlan(plan: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        plan = JSON.stringify(plan);
        return this._http.post(this._url, plan, options)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}


