import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './core/components/list-products/list-products.component';
import { CreateEditProductComponent } from './core/components/create-edit-product/create-edit-product.component';

const routes: Routes = [
  { path: "", component: ListProductsComponent, pathMatch: "full" },
  { path: "create", component: CreateEditProductComponent, pathMatch: "full" },
  { path: "edit/:id", component: CreateEditProductComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
