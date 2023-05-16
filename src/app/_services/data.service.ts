import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../_interfaces/State';
import { City } from '../_interfaces/City';
import { User } from '../_interfaces/User';
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
    return this.States;
  }

  findCityByID(id: number) {
    return this.Cities.filter(x => x.StateID == id);
  }

  verifyuser(email: string, password: string) {
    return this.Users.find(x => x.userName == email && x.password == password);
  }
}