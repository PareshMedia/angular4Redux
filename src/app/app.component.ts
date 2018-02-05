import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserService } from './service';
import { items } from './items';
import { City } from './city.model';

export interface AppStore {
  items: City[];
  selectedItem: City;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @Input() searchQuery = "";
  is_loading: boolean;
  noResult = false;
  items: Observable<Array<City>>;

  data = [];
  reduxData = {
    items: [],
    selectedItem: null
  };

  constructor(
    private store: Store<AppStore>,
    private http: Http,
    private userService: UserService
  ) {
    this.store.subscribe((res) => {
      this.reduxData = res;
      console.log(res);
    });
  }

  getCityDetails() {
    this.is_loading = true;
    this.userService.getCityService(this.searchQuery).subscribe(response => {
      this.data = response;
      this.noResult = (this.data.length > 0) ? false : true;
      this.is_loading = false;
    })
  }

  addCityRecord(obj: any) {
    this.store.dispatch({
      type: 'CREATE_ITEM', payload: obj
    });
  }

  removeCity(obj: any) {
    this.store.dispatch({
      type: 'DELETE_ITEM', payload: obj
    });
  }
}
