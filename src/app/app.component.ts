import { Component, Input } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Database } from '@ngrx/db';
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


  tempObj = {
    "title": "Newcastle",
    "location_type": "City",
    "woeid": 30079,
    "latt_long": "54.977940,-1.611620"
  };

  constructor(
    private store: Store<AppStore>,
    private http: Http,
    private userService: UserService,
    private db: Database
  ) {
    //INDEXDB 
    this.db.open("itemsDB", 1);
    
    this.store.subscribe((res) => {
      this.reduxData = res;
      console.log("GET ITEMS STORE=>", res);
    });

    this.db.query("items").subscribe((queryRes){
      this.store.dispatch({
        type: 'CREATE_ITEM', payload: queryRes
      });
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
    this.ngrxDB_Operatation(obj, "ADD");
  }

  removeCity(obj: any) {
    console.log("FROM REMOVE CITY->,"obj);
    this.store.dispatch({
      type: 'DELETE_ITEM', payload: obj
    });
    this.ngrxDB_Operatation(obj, "REMOVE");
  }

  ngrxDB_Operatation(obj, type: string) {
    if (type == "ADD") {
      this.db.insert("items", [obj], true).subscribe((resinsert) => {
        console.log("INSERT DB->", resinsert);
      });
    } else if (type == "REMOVE") {

    }
  }
}
