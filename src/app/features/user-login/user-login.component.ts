import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../service/system.service';
import { Users } from '../../models/users';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = "User Login";
  userLogin: UserLogin = new UserLogin();
  message?: string = undefined;
  subscription!: Subscription;

  constructor(private userSvc: UserService,
    private router: Router,
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.systemSvc.loggedInUser = new Users();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        this.systemSvc.loggedInUser = resp;
        this.router.navigateByUrl("/user-list");
      },
      error: (err) => {
        console.log("Error loggin in.  Please try again." + err);
        this.message = "Invalid username/password.  Please try again.";
      }
    })
  }

}
