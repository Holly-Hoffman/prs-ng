import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../models/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit, OnDestroy {
  title: string = "Vendor List";
  vendors: Vendor[] | undefined;
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();

    this.subscription = this.vendorSvc.list().subscribe(
      (resp) => {
        this.vendors = resp;
      }
    )
  }

  delete(id: number): void {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log("Error deleting vendor for id: ", err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
