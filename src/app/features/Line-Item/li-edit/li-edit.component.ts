import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineItem } from '../../../models/line-item';
import { Products } from '../../../models/products';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  productId!: number;
  product!: Products;
  subscription!: Subscription;

  constructor(private liSvc: LineitemService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
