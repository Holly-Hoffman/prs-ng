import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  loggedInUser: Users = new Users();

  constructor(private router: Router) { }

  checkLogin(): void {
    if (this.loggedInUser.id == 0) {
      console.log("User is not authenticated.  Redirecting to login.");
      this.router.navigateByUrl("/user-login");
    }
  }
}
