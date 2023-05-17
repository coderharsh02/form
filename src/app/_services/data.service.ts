import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../_interfaces/State';
import { City } from '../_interfaces/City';
import { User } from '../_interfaces/User';
import { map, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  States: State[] = [];
  Cities: City[] = [];
  Users: User[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>("./assets/data.json").subscribe({
      next: data => {
        this.States = data.States;
        this.Cities = data.Cities;
        this.Users = data.users;
      }
    });
  }

  findStates() {
    return this.http.get<any>('./assets/data.json').pipe(
      map((res) => {
        return res.States;
      })
    );
  }

  findCityByID(id: number) {
    return this.http.get<any>('./assets/data.json').pipe(
      map((res) => {
        return res.Cities.filter((x: any) => x.StateID == id);
      })
    );
  }

  verifyuser(email: string, password: string) {
    return this.Users.find(x => x.userName == email && x.password == password);
  }

  getCityAndStateByID(StateID: number, CityID: number) {
    let state = this.States.find((x: any) => x.StateID == StateID)?.StateName;
    let city = this.Cities.find((x: any) => (x.CityID == CityID))?.Name;
    return { city, state };
  };
}
