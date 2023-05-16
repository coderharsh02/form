import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { User } from '../_interfaces/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private dataService: DataService) { }
  
  setCurrentUser(user: User) {
    // localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login(email: string, password: string) {
    let user = this.dataService.verifyuser(email, password);
    if (user) {
      this.setCurrentUser(user);
    }
    return user;
  }

  logout() {
    // localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
