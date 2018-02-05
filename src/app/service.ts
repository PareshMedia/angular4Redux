import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { City } from './city.model';

@Injectable()
export class UserService {
    items: Observable<Array<City>>;
    constructor(
        private http: Http
    ) { }

    getCityService(query: string) {
        return this.http.get(`https://www.metaweather.com/api/location/search/?query=` + query)
            .map((res: Response) => res.json());
    }
}