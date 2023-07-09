import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers:any[] = [];
  filteredCustomers:any[] = [];
  filterCity = '';
  filterZipCode = '';
  isEditMode = false;
  custIdToUpdate:number = 0;

  customerForm!: FormGroup;
  constructor(private customerService: CustomerService, private fb: FormBuilder, private toast: NgToastService) { }
  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];

  @ViewChild('table') table!: APIDefinition;

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    })
    this.columns = [
      { key: 'customerId', title: 'ID' },
      { key: 'firstName', title: 'FirstName' },
      { key: 'lastName', title: 'LastName' },
      { key: 'email', title: 'Email' },
      { key: 'state', title: 'State' },
      { key: 'street', title: 'Street' },
      { key: 'city', title: 'City' },
      { key: 'zipCode', title: 'ZipCode' },
      {key:'action', title: 'Action'}

    ];
    this.getAllCustomer();

  }

  getAllCustomer(){
    this.customerService.getAll()
    .subscribe({
      next:(res)=>{
        this.customers = res;

        this.data = this.customers;
        this.filteredCustomers = this.customers;
        this.configuration = { ...DefaultConfig };
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  searchCity(city:string){
    this.customerService.getByCity(city)
    .subscribe(res=>{
      this.filteredCustomers = res;
      this.data = this.filteredCustomers;
    })
  }

  searchZipcode(zipCode: string) {
    this.customerService.getByZipcode(zipCode)
      .subscribe(res => {
        this.filteredCustomers = res;
        this.data = this.filteredCustomers;
      })
  }

  addCustomer(){
    console.log(this.customerForm.value);
    this.customerService.createCustomer(this.customerForm.value)
    .subscribe(res=>{
      console.log(res);
      this.toast.success({summary:res.message, detail:"SUCCESS", duration: 2000});
      this.customerForm.reset();
      this.getAllCustomer();
      document.getElementById("btn-close")?.click();
    })
  }

  onEdit(row:any){
    this.isEditMode = true;
    this.custIdToUpdate = row.customerId;
    this.customerForm.setValue({
      firstName: row.firstName,
      lastName: row.lastName,
      phone: row.phone,
      email: row.email,
      street: row.street,
      city: row.city,
      state: row.state,
      zipCode: row.zipCode,
    })

  }

  updateCustomer() {
    let customerObj = {
      customerId: this.custIdToUpdate,
      ...this.customerForm.value
    }
    this.customerService.updateCustomer(customerObj)
      .subscribe(res => {
        console.log(res);
        this.toast.success({ summary: res.message, detail: "SUCCESS", duration: 2000 });
        this.customerForm.reset();
        this.getAllCustomer();
        document.getElementById("btn-close")?.click();
      })
  }

  close(){
    this.isEditMode = false;
  }
}
