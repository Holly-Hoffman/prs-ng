import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../models/line-item';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-li-edit',
  templateUrl: './li-edit.component.html',
  styleUrls: ['./li-edit.component.css']
})
export class LiEditComponent implements OnInit, OnDestroy {
  title: string = "Edit Line Items";
  requestId!: number;
  request!: Request;
  liId!: number;
  li!: LineItem;
  products: Products[] = [];
  subscription!: Subscription;

  constructor(private liSvc: LineitemService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService,
    private productSvc: ProductsService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe(parameters => {
      console.log("Current route parameters: ", parameters);
      this.liId = parameters["id"];
    });

    this.subscription = this.liSvc.getById(this.liId).subscribe({
      next: (resp) => {
        this.li = resp;
      },
      error: (err) => {
        console.log("Error editing the line item: ", err);
      },
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

  save() {
    this.liSvc.edit(this.li).subscribe({
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
