import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { StaffComponent } from './staff/staff.component';
import { StoreComponent } from './store/Store.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {path: '', component: DashboardComponent,
  children:[
    {path: '', component:HomeComponent, canActivate:[AuthGuard]},
    { path: 'customer', component: CustomerComponent, canActivate:[AuthGuard] },
    { path: 'store', component: StoreComponent, canActivate:[AuthGuard] },
    { path: 'staff', component: StaffComponent, canActivate:[AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate:[AuthGuard] },
    { path: 'brands', component: BrandsComponent, canActivate:[AuthGuard] },
    { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
