import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../models/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = "Vendor Detail";
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
    
    this.currentRoute.params.subscribe((parameters) => {
      this.vendorId = parameters["id"];
    });

    this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
      next: (resp) => {
        this.vendor = resp;
      },
      error: (err) => {
        console.log("Error retrieving vendor: ", err);
      },
    });
  }

  delete() {
    this.subscription = this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.vendor = resp as Vendor;
        this.router.navigateByUrl("/vendor-list");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
