import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../models/request';
import { SystemService } from '../../../service/system.service';
import { LineItem } from '../../../models/line-item';
import { LineitemService } from '../../../service/lineitem.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit, OnDestroy {
  title: string = "Review Request";
  lineItems!: LineItem[];
  lineItem!: LineItem;
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(private requestSvc: RequestService,
    private liSvc: LineitemService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe((parameters) => {
      this.requestId = parameters['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.log("Error retrieving request: ", err);
        },
      });
    });

    this.liSvc.getByReq(this.requestId).subscribe({
      next: (resp) => {
        this.lineItems = Array.isArray(resp) ? resp : [];
      },
      error: (err) => {
        console.log("Error retrieving line items: ", err);
      }
    });
  }

  get requestID() { return (this.request && this.request.id) ? this.request.id : null };


  refreshLines(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.liSvc.getByReq(id).subscribe({
      next: (resp) => {
        this.lineItems = Array.isArray(resp) ? resp : [];
      },
      error: (err) => {
        console.log("Error finding line items: ", err);
      }
    });
  }

  refreshRequest(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.requestSvc.getById(id).subscribe({
      next: () => {
        this.subscription = this.requestSvc.getById(id).subscribe((resp) => {
          //console.debug("Request:", resp);
          this.request = resp;
        })
      },
      error: (err) => {
        console.log("Error getting request: ", err);
      }
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
