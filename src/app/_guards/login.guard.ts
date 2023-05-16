import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) {

  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          if (user.role == next.data['role']) {
            return true;
          }
          else {
            return false;
          }
        }
        this.router.navigateByUrl('/login');
        return false
      }));
  }
}
