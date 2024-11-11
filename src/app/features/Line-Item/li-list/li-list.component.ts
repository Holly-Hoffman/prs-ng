import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../models/line-item';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { Request } from '../../../models/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-li-list',
  templateUrl: './li-list.component.html',
  styleUrls: ['./li-list.component.css']
})
export class LiListComponent implements OnInit, OnDestroy {
  title: string = "Line Items List";
  lineItems!: LineItem[];
  lineItem!: LineItem;
  subscription!: Subscription;
  request!: Request

  constructor(private liSvc: LineitemService,
    private reqSvc: RequestService,
    private sysService: SystemService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    let id = parseInt(this.currentRoute.snapshot.params['id']);

    this.subscription = this.reqSvc.getById(id).subscribe({
      next: () => {
        this.subscription = this.reqSvc.getById(id).subscribe((resp) => {
          console.debug("Request:", resp);
          this.request = resp;
        });
      },
      error: (err) => {
        console.log("Error retrieving request: ", err);
      },
    });

    this.liSvc.getByReq(id).subscribe({
      next: () => {
        this.subscription = this.liSvc.getByReq(id).subscribe((resp) => {
          console.debug("Request Lines:", resp);
          this.lineItems;
        })
      },
      error: (err) => {
        console.log("Error retrieving line items: ", err);
      }
    });
  }

  multiply(a: number, b: number): number {
    return (a * b);
  }

  refreshLines(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.liSvc.getById(id).subscribe({
      next: () => {
        this.subscription = this.liSvc.getById(id).subscribe((resp) => {
          console.debug("Request Lines:", resp);
          this.lineItems;
        })
      },
      error: (err) => {
        console.log("Error finding line items: ", err);
      }
    });
  }

  refreshRequest(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.reqSvc.getById(id).subscribe({
      next: () => {
        this.subscription = this.reqSvc.getById(id).subscribe((resp) => {
          console.debug("Request:", resp);
          this.request = resp;
        })
      },
      error: (err) => {
        console.log("Error getting request: ", err);
      }
    });
  }

  deleteLine(id: number): void {
    this.subscription = this.liSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.liSvc.list().subscribe((resp) => {
          console.debug("Line Item deleted!");
          this.refreshLines();
          this.refreshRequest();
        });
      },
      error: (err) => {
        console.log("Could not delete line item: ", err);
      },
    });
  }

  submit(): void {
    this.subscription = this.reqSvc.review(this.request).subscribe({
      next: () => {
        this.subscription = this.reqSvc.list().subscribe((resp) => {
          this.refreshRequest();
        });
      },
      error: (err) => {
        console.log("Error submitting request: ", err);
      },
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}