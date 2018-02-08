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
  woeid = [];

  constructor(
    private store: Store<AppStore>,
    private http: Http,
    private userService: UserService,
    private db: Database
  ) {
    //INDEXDB 
    this.db.open("itemsDB", 1);
    this.db.query("items").subscribe((queryRes) => {
      this.store.dispatch({
        type: 'CREATE_ITEM', payload: queryRes
      });
      this.woeidOperations(queryRes.woeid, "ADD");
    });

    this.store.subscribe((res) => {
      this.reduxData = res;
      console.log("GET ITEMS STORE=>", res);
    });
  }

  woeidOperations(id: number, type: string) {
    switch (type) {
      case "ADD": this.woeid.push(id);
        break;

      case "REMOVE":
        var index = this.woeid.indexOf(id);
        if (index > -1) this.woeid.splice(index, 1);
        break;

      case "CHECK":
        if (this.woeid.indexOf(id) == -1) {
          return false;
        } else {
          return true;
        }
    }

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
    if (!this.woeidOperations(obj.woeid, "CHECK")) {
      this.ngrxDB_Operatation(obj, "ADD");
      this.db.query("items").subscribe((queryRes) => {
        if (obj.woeid === queryRes.woeid) {
          this.store.dispatch({
            type: 'CREATE_ITEM', payload: queryRes
          });
          this.woeidOperations(queryRes.woeid, "ADD");
        }
      });
    } else {
      alert("Alredy Exist !!");
    }
  }

  removeCity(obj: any) {
    this.db.query("items").subscribe((queryRes) => {
      if (queryRes.woeid == obj.woeid) {
        console.log(obj);
        this.store.dispatch({
          type: 'DELETE_ITEM', payload: obj
        });
        this.woeidOperations(obj.woeid, "REMOVE");
        this.ngrxDB_Operatation(obj, "REMOVE");
      }
    });
  }

  ngrxDB_Operatation(obj, type: string) {
    if (type == "ADD") {
      this.db.insert("items", [obj], true).subscribe((insertRes) => {
      });

    } else if (type == "REMOVE") {
      this.db.executeWrite("items", "delete", [obj.id]).subscribe((deleteObj) => {
      });
    }
  }
}
