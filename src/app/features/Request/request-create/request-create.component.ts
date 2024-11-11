import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { Router } from '@angular/router';
import { RequestForm } from '../../../models/request-form';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = 'Request Create';
  newRequest: RequestForm = new RequestForm();
  subscription!: Subscription;

  constructor(private requestSvc: RequestService,
    private systemSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.systemSvc.checkLogin();
    this.newRequest.user = this.systemSvc.loggedInUser;
  }

  addRequest() {
    this.subscription = this.requestSvc.add(this.newRequest).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/request-list");
      },
      error: (err) => {
        console.log("Error creating request", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
