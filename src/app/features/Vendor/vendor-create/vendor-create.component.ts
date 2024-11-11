import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../models/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Create';
  newVendor: Vendor = new Vendor();
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService,
    private router: Router,
    private sysService: SystemService
  ) { }

  ngOnInit(): void {
    this.sysService.checkLogin();
  }

  addVendor() {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe((resp) => {
      this.router.navigateByUrl("/vendor-list");
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
