import { Component, OnInit } from '@angular/core';
import { DataService } from './_services/data.service';
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  title = 'angular-college';

  constructor(private dataService: DataService, private accountService: AccountService) {
    
  }

  ngOnInit(): void {
  }

  getState() {
    console.log(this.dataService.findStates());
  }

  getCity(id: number) {
    console.log(this.dataService.findCityByID(id));
  }

  verifyUser(email: string, password: string) {
    console.log(this.accountService.login(email, password));
  }

  logout() {
    this.accountService.logout();
  }
}
