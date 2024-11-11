import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../models/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = "Request Detail";
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
    
    this.currentRoute.params.subscribe((parameters) => {
      this.requestId = parameters["id"];
    });

    this.subscription = this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        console.log("Error retrieving request: ", err);
      },
    });
  }

  delete() {
    this.subscription = this.requestSvc.delete(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp as Request;
        this.router.navigateByUrl("/request-list");
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
