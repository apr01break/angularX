import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductsComponent } from './core/components/list-products/list-products.component';
import { CreateEditProductComponent } from './core/components/create-edit-product/create-edit-product.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PaginationComponent } from './core/components/pagination/pagination.component';
import { FilterPipe } from './core/pipes/filter.pipe';
import { PaginationPipe } from './core/pipes/pagination.pipe';
import { DatePipe } from '@angular/common';
import { MessageComponent } from './core/components/message/message.component';
import { OverlayComponent } from './core/components/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    CreateEditProductComponent,
    NavbarComponent,
    PaginationComponent,
    FilterPipe,
    PaginationPipe,
    MessageComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    PaginationPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
