import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../service/products.service';
import { Router } from '@angular/router';
import { Vendor } from '../../../models/vendor';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title: string = 'Product Create';
  newProduct: Products = new Products();
  subscription!: Subscription;
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductsService,
    private vendorSvc: VendorService,
    private router: Router,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.log("Error loading vendors: ", err);
      }
    });
  }

  addProduct() {
    this.subscription = this.productSvc.add(this.newProduct).subscribe((resp) => {
      this.router.navigateByUrl("/product-list");
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
