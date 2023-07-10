import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { StaffService } from 'src/app/service/staff.service';
import { orderStatus } from 'src/app/shared/order-staus';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: any[] = [];
  customers: any[] = [];
  products: any[] = [];

  selectedItems: any[] = [];
  orderDetails: any;
  filteredorders: any[] = [];
  filterBrand = '';
  filterCategory = '';
  filterModelYear = '';
  isEditMode = false;
  orderStatus = orderStatus;

  role = '';
  brands: any[] = [];
  categories: any[] = [];
  productIdToUpdate: number = 0;

  selectedItemForm!: FormGroup;
  constructor(private fb: FormBuilder, private orderService: OrderService,
    private productService: ProductService,
    private staffService: StaffService,
    private customerService: CustomerService,
    private router: Router,
    private auth: AuthService,
    private toast: NgToastService) { }
  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];

  ngOnInit(): void {
    this.selectedItemForm = this.fb.group({
      customerId: ['',],
      productId: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      orderStatus: ['', Validators.required],
    });

    this.getAllCustomer();
    this.getAllProduct();

    const staffId = this.auth.getDecodedToken().staffId;
    this.role = this.auth.getDecodedToken().role;
    if (this.role === 'Staff' || this.role === "Admin") {
      if (this.role === 'Admin') {
        this.getAllOrders();
      } else {
        this.getAllOrdersByStaff(staffId);
      }

      this.columns = [
        { key: 'orderId', title: 'Order ID', width: '10%' },
        { key: 'customer.firstName', title: 'Customer Name', width: '18%' },
        { key: 'orderStatus', title: 'Status' },
        { key: 'orderDate', title: 'Order Date' },
        { key: 'shippedDate', title: 'Shipped Date' },
        { key: 'store.storeName', title: 'Store Name' },
        { key: 'staff.firstName', title: 'Staff Name' }

      ];
    } else {
      this.getAllOrders();
      this.columns = [
        { key: 'orderId', title: 'Order ID', width: '10%' },
        { key: 'customer.firstName', title: 'Customer Name', width: '18%' },
        { key: 'orderStatus', title: 'Status' },
        { key: 'orderDate', title: 'Order Date' },
        { key: 'shippedDate', title: 'Shipped Date' },
        { key: 'store.storeName', title: 'Store Name' },
        { key: 'staff.firstName', title: 'Staff Name' },
        { key: 'action', title: 'Action', }
      ];
    }
    // this.staffService.getAll()
    //   .subscribe(res => {
    //     res.forEach((a:any)=>{
    //       if(a.staffId === staffId){
    //         this.selectedStaffId = a.staffId;
    //         this.selectedStoreId = a.storeId
    //       }
    //     })

    //   });
  }

  // selectCustomerId = 0;
  // selectedProductPrice = 0;
  // selectedStaffId = 0;
  // selectedStoreId = 0;

  // itemId = 1;
  // addSelectedItem() {

  //   let items = {
  //     itemId: this.itemId++,
  //     listPrice: this.selectedProductPrice,
  //     productId: this.selectedItemForm.value.productId,
  //     discount: this.selectedItemForm.value.discount / 100,
  //     quantity: this.selectedItemForm.value.quantity
  //   }
  //   this.selectedItems.push(items);
  //   this.selectedItemForm.reset();
  //   this.selectedItemForm.controls['customerId'].patchValue(this.selectCustomerId);
  //   this.selectedItemForm.controls['orderStatus'].patchValue(0);
  // }
  // selectCustomer() {
  //   this.selectCustomerId = this.selectedItemForm.value.customerId;
  //   this.selectedItemForm.controls['customerId'].disable();
  // }

  // selectProductPrice() {
  //   this.selectedProductPrice = this.products[this.selectedItemForm.value.productId - 1].listPrice;
  // }

  // saveChanges() {
  //   let createOderObj = {
  //     customerId: +this.selectCustomerId,
  //     staffId: this.selectedStaffId,
  //     orderStatus: 0,
  //     storeId: this.selectedStoreId,
  //     orderItems: this.selectedItems
  //   }
  //   console.log(createOderObj);
  //   this.orderService.createOrder(createOderObj)
  //     .subscribe(res => {
  //       this.toast.success({ detail: "SUCCESS", summary: "Order Created", duration: 2000 });
  //       this.selectedItemForm.reset();
  //       document.getElementById("btn-close")?.click();
  //     })
  // }

  getAllCustomer() {
    this.customerService.getAll()
      .subscribe({
        next: (res) => {
          this.customers = res;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getAllProduct() {
    this.productService.getAll()
      .subscribe({
        next: (res) => {
          this.products = res;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

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
  getAllOrdersByStaff(id: number) {
    this.orderService.getOrdersByStaffId(id)
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

  viewOrder(id: number) {
    this.router.navigate(['home/order-detail', id])
  }

  onAdd() {
    this.isEditMode = false;
  }


  orderIdToUpdateStatus = 0;
  onEdit(row: any) {
    this.isEditMode = true;
    this.orderIdToUpdateStatus = row.orderId

    this.selectedItemForm.controls['customerId'].patchValue(row.customerId);
    this.selectedItemForm.controls['customerId'].disable();
    this.selectedItemForm.controls['orderStatus'].patchValue(row.orderStatus)
  }

  updateStatus() {
    let statusUpdateObj = {
      orderId: this.orderIdToUpdateStatus,
      orderStatus: this.selectedItemForm.value.orderStatus
    }

    this.orderService.updateStatus(statusUpdateObj)
      .subscribe(res => {
        this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 2000 })
        document.getElementById("update")?.click();
        this.getAllOrders();
        this.selectedItemForm.reset();
      })
  }

  close() {
    this.isEditMode = false;
  }

}
