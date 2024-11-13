import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { Request } from '../../../models/request';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent implements OnInit, OnDestroy {
  title: string = 'Request List';
  requests: Request[] | undefined;
  request!: Request;
  subscription!: Subscription;
  userId!: number;

  constructor(private requestSvc: RequestService,
    private sysService: SystemService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
    this.userId = this.sysService.loggedInUser.id;

    this.subscription = this.requestSvc.list().subscribe(
      (resp) => {
        this.requests = resp;
      }
    );
  }

  //check these 3!!
  refreshRequest(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.requestSvc.list().subscribe({
      next: () => {
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          //console.debug("Request:", resp);
          this.requests = resp;
        })
      },
      error: (err) => {
        console.log("Error getting request: ", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
