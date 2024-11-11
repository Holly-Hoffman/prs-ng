import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  title: string = 'User List';
  users: Users[] | undefined;
  subscription!: Subscription;

  constructor(private userSvc: UserService,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.subscription = this.userSvc.list().subscribe(
      (resp) => {
        this.users = resp;
      }
    );
  }

  delete(id: number): void {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: ', err);
        alert('Error deleting user for id: ' + id);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
