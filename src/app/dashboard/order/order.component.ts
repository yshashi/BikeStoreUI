import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { OrderService } from 'src/app/service/order.service';
import { orderStatus } from 'src/app/shared/order-staus';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  orderDetails: any;
  filteredorders: any[] = [];
  filterBrand = '';
  filterCategory = '';
  filterModelYear = '';
  isEditMode = false;
  orderStatus = orderStatus;

  brands: any[] = [];
  categories: any[] = [];
  productIdToUpdate: number = 0;

  productForm!: FormGroup;
  constructor(private fb: FormBuilder, private orderService: OrderService,
    private router: Router,

    private toast: NgToastService) { }
  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      modelYear: ['', Validators.required],
      listPrice: ['', Validators.required],
    })
    this.columns = [
      { key: 'orderId', title: 'Order ID', width:'10%' },
      { key: 'customer.firstName', title: 'Customer Name',width:'18%' },
      { key: 'orderStatus', title: 'Status' },
      { key: 'orderDate', title: 'Order Date' },
      { key: 'shippedDate', title: 'Shipped Date' },
      { key: 'store.storeName', title: 'Store Name' },
      { key: 'staff.firstName', title: 'Staff Name' },
      { key: 'action', title: 'Action' }

    ];
    // this.getAllProduct();
    // this.getAllBrands();
    // this.getAllCategory();
    this.getAllOrders();

  }

  // getAllBrands() {
  //   this.brandService.getAll()
  //     .subscribe(res => {
  //       this.brands = res;
  //     })
  // }

  // getAllCategory() {
  //   this.categoryService.getAll()
  //     .subscribe(res => {
  //       this.categories = res;
  //     })
  // }

  getAllOrders() {
    this.orderService.getAll()
      .subscribe({
        next: (res) => {
          this.orders = res;

          this.data = this.orders;
          this.filteredorders = this.orders;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  viewOrder(id: number){
    this.router.navigate(['home/order-detail', id])
  }
  // searchCategory(city: string) {
  //   this.orderService.getByCategory(city)
  //     .subscribe(res => {
  //       this.filteredorders = res;
  //       this.data = this.filteredorders;
  //     })
  // }

  // searchBrand(zipCode: string) {
  //   this.orderService.getByBrand(zipCode)
  //     .subscribe(res => {
  //       this.filteredorders = res;
  //       this.data = this.filteredorders;
  //     })
  // }

  // searchModelYear(year: string) {
  //   this.orderService.getByModelYear(year)
  //     .subscribe(res => {
  //       this.filteredorders = res;
  //       this.data = this.filteredorders;
  //     })
  // }

  onAdd() {
    this.productForm.reset();
    this.isEditMode = false;
  }

  // addProduct() {
  //   console.log(this.productForm.value);
  //   this.orderService.createProduct(this.productForm.value)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.toast.success({ summary: "Product Added Successfully", detail: "SUCCESS", duration: 2000 });
  //       this.productForm.reset();
  //       this.getAllProduct();
  //       document.getElementById("btn-close")?.click();
  //     })
  // }

  onEdit(row: any) {
    this.isEditMode = true;
    this.productIdToUpdate = row.productId;
    this.productForm.setValue({
      productName: row.productName,
      brandId: row.brandId,
      categoryId: row.categoryId,
      modelYear: row.modelYear,
      listPrice: row.listPrice,
    })

  }

  // updateProduct() {
  //   let productObj = {
  //     productId: this.productIdToUpdate,
  //     ...this.productForm.value
  //   }
  //   this.orderService.updateProduct(productObj)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.isEditMode = false;
  //       this.toast.success({ summary: "Product Updated Successfully!", detail: "SUCCESS", duration: 2000 });
  //       this.productForm.reset();
  //       this.getAllProduct();
  //       document.getElementById("btn-close")?.click();
  //     })
  // }

  close() {
    this.isEditMode = false;
  }

}
