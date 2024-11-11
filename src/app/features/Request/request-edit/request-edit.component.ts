import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../models/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = "Request Edit";
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
      this.requestId = parameters["id"];
    });

    this.subscription = this.requestSvc.getById(this.requestId).subscribe({
      next: (resp) => {
        this.request = resp;
      },
      error: (err) => {
        console.log("Error editing the request: ", err);
      },
    });
  }

  save() {
    this.requestSvc.edit(this.request).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/request-list");
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
