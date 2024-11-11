import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../models/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {
  title: string = 'Request List';
  requests: Request[] | undefined;
  subscription!: Subscription;

  constructor(private requestSvc: RequestService,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.subscription = this.requestSvc.list().subscribe(
      (resp) => {
        this.requests = resp;
      }
    );
  }

  delete(id: number): void {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log("Error deleting request for id: ", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
