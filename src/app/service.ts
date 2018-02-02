import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    constructor(
        private http: Http
    ) { }

    getCityService(query: string) {
        return this.http.get(`https://www.metaweather.com/api/location/search/?query=` + query)
            .map((res: Response) => res.json());
    }
}