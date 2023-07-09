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

const routes: Routes = [
  {path: '', component: DashboardComponent,
  children:[
    {path: '', component:HomeComponent, canActivate:[AuthGuard]},
    { path: 'customer', component: CustomerComponent, canActivate:[AuthGuard] },
    { path: 'store', component: StoreComponent, canActivate:[AuthGuard] },
    { path: 'staff', component: StaffComponent, canActivate:[AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate:[AuthGuard] },
    { path: 'brands', component: BrandsComponent, canActivate:[AuthGuard] },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
