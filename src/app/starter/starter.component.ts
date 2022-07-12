import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonAlerts } from '../common-alerts';
import { UsersService } from '../providers/users-service/users.service';
declare var $: any
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  userForm: FormGroup;
  isLoading: boolean = false
  hide = true;
  constructor(public fb: FormBuilder,
    private router: Router, private usersService: UsersService,
    private commonAlerts: CommonAlerts, private cookieService: CookieService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.cookieService.deleteAll();
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }


  login() {
    if (this.userForm.invalid) {
      return;
    }
    this.loadSpinner()
    var param = {
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    let body = JSON.stringify(param);

    this.usersService.loginUser(body).subscribe({
      next: (response) => {
        if (response.header.code == 200) {
          this.setAuthToken(response.data.tokenJWT, response.data.user.hashUser)
          this.router.navigate(['/usuarios']);
        } else {
          this.commonAlerts.showWarnning(response.header.message)
        }
      },
      error: (e) => {
        console.log("eeror>>", e);
        this.commonAlerts.showToastError(e);
      },
      complete: () => this.terminateSpinner()
    }
    )
  }

  setAuthToken(token: any, hashUser: any) {
    this.cookieService.set('jwt', token);
    this.cookieService.set('isLogin', hashUser);
  }

}
