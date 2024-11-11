import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './features/Users/user-list/user-list.component';
import { UserCreateComponent } from './features/Users/user-create/user-create.component';
import { UserDetailComponent } from './features/Users/user-detail/user-detail.component';
import { UserEditComponent } from './features/Users/user-edit/user-edit.component';
import { MenuComponent } from './core/menu/menu.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { VendorCreateComponent } from './features/Vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './features/Vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './features/Vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './features/Vendor/vendor-list/vendor-list.component';
import { ProductCreateComponent } from './features/Product/product-create/product-create.component';
import { ProductDetailComponent } from './features/Product/product-detail/product-detail.component';
import { ProductEditComponent } from './features/Product/product-edit/product-edit.component';
import { ProductListComponent } from './features/Product/product-list/product-list.component';
import { RequestCreateComponent } from './features/Request/request-create/request-create.component';
import { RequestDetailComponent } from './features/Request/request-detail/request-detail.component';
import { RequestEditComponent } from './features/Request/request-edit/request-edit.component';
import { RequestListComponent } from './features/Request/request-list/request-list.component';
import { UserLoginComponent } from './features/user-login/user-login.component';
import { LiListComponent } from './features/Line-Item/li-list/li-list.component';
import { LiAddComponent } from './features/Line-Item/li-add/li-add.component';
import { LiEditComponent } from './features/Line-Item/li-edit/li-edit.component';
import { LiFindOnReqComponent } from './features/Line-Item/li-find-on-req/li-find-on-req.component';
import { RequestReviewComponent } from './features/Request/request-review/request-review.component';
import { RequestReviewListComponent } from './features/Request/request-review-list/request-review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserEditComponent,
    MenuComponent,
    NotFoundComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    VendorEditComponent,
    VendorListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    RequestCreateComponent,
    RequestDetailComponent,
    RequestEditComponent,
    RequestListComponent,
    UserLoginComponent,
    LiListComponent,
    LiAddComponent,
    LiEditComponent,
    LiFindOnReqComponent,
    RequestReviewComponent,
    RequestReviewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
