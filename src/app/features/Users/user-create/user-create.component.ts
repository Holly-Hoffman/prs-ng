import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  title: string = 'User Create';
  newUser: Users = new Users();
  subscription!: Subscription;

  constructor(private userSvc: UserService,
    private router: Router,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
  }

  addUser() {
    this.subscription = this.userSvc.add(this.newUser).subscribe((resp) => {
      this.router.navigateByUrl("/user-list");
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
