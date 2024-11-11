import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  title: string = "Product Detail";
  productId!: number;
  product!: Products;
  subscription!: Subscription;

  constructor(
    private productSvc: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe((parameters) => {
      this.productId = parameters["id"];
    });

    this.subscription = this.productSvc.getById(this.productId).subscribe({
      next: (resp) => {
        this.product = resp;
      },
      error: (err) => {
        console.log("Error retrieving product: ", err);
      },
    });
  }

  delete() {
    this.subscription = this.productSvc.delete(this.productId).subscribe({
      next: (resp) => {
        this.product = resp as Products;
        this.router.navigateByUrl("/product-list");
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
