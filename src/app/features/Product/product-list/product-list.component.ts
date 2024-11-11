import { Component, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../service/products.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  title: string = 'Product List';
  products: Products[] | undefined;
  subscription!: Subscription;

  constructor(private productSvc: ProductsService,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
    
    this.subscription = this.productSvc.list().subscribe(
      (resp) => {
        this.products = resp;
      }
    );
  }

  delete(id: number): void {
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.productSvc.list().subscribe((resp) => {
          this.products = resp;
        });
      },
      error: (err) => {
        console.log("Error deleting product for id: ", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
