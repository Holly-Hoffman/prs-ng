import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../models/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit, OnDestroy {
  title: string = "Vendor Edit";
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private sysService: SystemService
  ) {}

  ngOnInit(): void {
    this.sysService.checkLogin();
    
    this.currentRoute.params.subscribe(parameters => {
      console.log("Current route parameters: ", parameters);
      this.vendorId = parameters["id"];
    });

    this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
      next: (resp) => {
        this.vendor = resp;
        console.log(this.vendor);
      },
      error: (err) => {
        console.log("Error editing vendor: ", err);
      },
    });
  }

  save() {
    this.vendorSvc.edit(this.vendor).subscribe({
      next: (resp) => {
        this.router.navigateByUrl("/vendor-list");
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
