import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { INCREMENT, DECREMENT, RESET, ADDCITY } from './counter';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserService } from './service';


interface city {
  title: string,
  location_type: string,
  woeid: string,
  latt_long: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @Input() searchQuery = "";
  addedCity$: Observable<city>;
  data = [];
  redux_city: any;

  constructor(private store: Store<city>, private http: Http, private userService: UserService) {
    this.addedCity$ = store.pipe(select('city'));
  }

  getCityDetails() {
    this.userService.getCityService(this.searchQuery).subscribe(response => {
      this.data = response;
    })
  }

  addCityRecord(obj: any) {
    this.store.dispatch({
      type: ADDCITY,
      city: obj
    });

    this.store.subscribe((res) => {
      this.redux_city = res;
      console.log(this.redux_city);
    });
  }
}
