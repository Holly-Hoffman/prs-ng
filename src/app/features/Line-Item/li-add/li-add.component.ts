import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../models/line-item';
import { Subscription } from 'rxjs';
import { Products } from '../../../models/products';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductsService } from '../../../service/products.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

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

  constructor(private liSvc: LineitemService,
    private productSvc: ProductsService,
    private sysService: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

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
    this.subscription = this.liSvc.add(this.newItem).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/request/" + this.newItem.request.id);
      },
      error: (err) => {
        console.log("Error creating line item", err);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
