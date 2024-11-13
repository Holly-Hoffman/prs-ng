import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../models/line-item';
import { Subscription } from 'rxjs';
import { Products } from '../../../models/products';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductsService } from '../../../service/products.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../models/request';

@Component({
  selector: 'app-li-add',
  templateUrl: './li-add.component.html',
  styleUrls: ['./li-add.component.css']
})
export class LiAddComponent implements OnInit, OnDestroy {
  title: string = "Add a Line Item";
  newItem: LineItem = new LineItem();
  subscription!: Subscription;
  products: Products[] = [];
  requestId!: number;
  request!: Request;

  constructor(private liSvc: LineitemService,
    private productSvc: ProductsService,
    private sysService: SystemService,
    private router: Router,
    private reqSvc: RequestService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe((parameters) => {
      this.requestId = parameters['id'];
      this.subscription = this.reqSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
          console.log("ngOnInit request set:", this.request);
        },
        error: (err) => {
          console.log("Error retrieving request: ", err);
        },
      });
    });

    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.log("Error loading products: ", err);
      },
    });


  }

  addLineItem() {
    this.newItem.request = this.request;

    this.subscription = this.liSvc.add(this.newItem).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/li-list/" + this.newItem.request.id);
      },
      error: (err) => {
        console.log("Error creating line item", err);
        console.log("line item:", this.newItem);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
