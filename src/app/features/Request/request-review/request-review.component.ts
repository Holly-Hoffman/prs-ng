import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../models/request';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit, OnDestroy {
  title: string = "Review Request";
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(private requestSvc: RequestService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe(parameters => {
      console.log("Current route parameters: ", parameters);
      this.requestId = parameters['id'];
    });


  }

  approve() {
    this.requestSvc.approve(this.request).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/request-list");
      },
      error: (err) => {
        console.log("Error approving request: ", err);
      },
    });
  }

  reject() {
    this.requestSvc.reject(this.request).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/request-list");
      },
      error: (err) => {
        console.log("Error rejecting request: ", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
