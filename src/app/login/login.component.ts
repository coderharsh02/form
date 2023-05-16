import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  login() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.loginForm.value);
    let user = this.accountService.login(this.loginForm.value.username || '', this.loginForm.value.password || '');
    if (user) {
      alert('Login Successful');
      if (user.role == 'admin')
        this.router.navigateByUrl('/admin')
      else
        this.router.navigateByUrl('/staff');
    }
    else {
      alert('Login Failed: Invalid Password');
    }
  }

}
