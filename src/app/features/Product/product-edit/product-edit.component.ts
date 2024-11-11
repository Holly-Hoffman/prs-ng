import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = "Product Edit";
  productId!: number;
  product!: Products;
  subscription!: Subscription;

  constructor(private productSvc: ProductsService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.currentRoute.params.subscribe(parameters => {
      console.log("Current route parameters: ", parameters);
      this.productId = parameters["id"];
    });

    this.subscription = this.productSvc.getById(this.productId).subscribe({
      next: (resp) => {
        this.product = resp;
      },
      error: (err) => {
        console.log("Error editing the product: ", err);
      },
    });
  }

  save() {
    this.productSvc.edit(this.product).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/product-list");
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
