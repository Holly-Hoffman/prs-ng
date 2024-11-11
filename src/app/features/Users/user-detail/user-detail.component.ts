import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  title: string = "User Detail";
  userId!: number;
  user!: Users;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
    
    this.currentRoute.params.subscribe((parameters) => {
      this.userId = parameters["id"];
    });

    this.subscription = this.userSvc.getById(this.userId).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (err) => {
        console.log("Error retrieving user: ", err);
      },
    });
  }

  delete() {
    this.subscription = this.userSvc.delete(this.userId).subscribe({
      next: (resp) => {
        this.user = resp as Users;
        this.router.navigateByUrl("/user-list");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
