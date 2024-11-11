import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  title: string = "User Edit";
  userId!: number;
  user!: Users;
  subscription!: Subscription;

  constructor(private userSvc: UserService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe(parameters => {
      console.log("Current route parameters: ", parameters);
      this.userId = parameters["id"];
    });

    this.subscription = this.userSvc.getById(this.userId).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (err) => {
        console.log("Error editing the user: ", err);
      },
    });
  }

  save() {
    this.userSvc.edit(this.user).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/user-list");
      },
      error: (err) => {
        console.log("Error saving edit: ", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
