import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/Users/user-list/user-list.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UserCreateComponent } from './features/Users/user-create/user-create.component';
import { UserEditComponent } from './features/Users/user-edit/user-edit.component';
import { UserDetailComponent } from './features/Users/user-detail/user-detail.component';
import { VendorListComponent } from './features/Vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './features/Vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './features/Vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './features/Vendor/vendor-edit/vendor-edit.component';
import { ProductListComponent } from './features/Product/product-list/product-list.component';
import { ProductCreateComponent } from './features/Product/product-create/product-create.component';
import { ProductDetailComponent } from './features/Product/product-detail/product-detail.component';
import { ProductEditComponent } from './features/Product/product-edit/product-edit.component';
import { RequestCreateComponent } from './features/Request/request-create/request-create.component';
import { RequestDetailComponent } from './features/Request/request-detail/request-detail.component';
import { RequestEditComponent } from './features/Request/request-edit/request-edit.component';
import { RequestListComponent } from './features/Request/request-list/request-list.component';
import { UserLoginComponent } from './features/user-login/user-login.component';
import { LiListComponent } from './features/Line-Item/li-list/li-list.component';
import { LiAddComponent } from './features/Line-Item/li-add/li-add.component';
import { LiEditComponent } from './features/Line-Item/li-edit/li-edit.component';
import { LiFindOnReqComponent } from './features/Line-Item/li-find-on-req/li-find-on-req.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'vendor-list', component: VendorListComponent },
  { path: 'vendor-create', component: VendorCreateComponent },
  { path: 'vendor-edit/:id', component: VendorEditComponent },
  { path: 'vendor-detail/:id', component: VendorDetailComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'request-list', component: RequestListComponent },
  { path: 'request-create', component: RequestCreateComponent },
  { path: 'request-edit/:id', component: RequestEditComponent },
  { path: 'request-detail/:id', component: RequestDetailComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'li-list/:id', component: LiListComponent },
  { path: 'li-add', component: LiAddComponent },
  { path: 'li-edit/:id', component: LiEditComponent },
  { path: 'li-find-on-req/:id', component: LiFindOnReqComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
