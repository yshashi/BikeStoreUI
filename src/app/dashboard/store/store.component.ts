import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];
  categories = [];
  isEditMode = false;
  storeIdToUpdate = 0;

  storeForm!: FormGroup;
  constructor(private storeService: StoreService, private fb: FormBuilder, private toast: NgToastService) { }

  ngOnInit() {
    this.columns = [
      { key: 'storeId', title: 'Store ID' },
      { key: 'storeName', title: 'Store Name' },
      { key: 'phone', title: 'Phone' },
      { key: 'email', title: 'Email' },
      { key: 'street', title: 'Street' },
      { key: 'city', title: 'City' },
      { key: 'state', title: 'State' },
      { key: 'zipCode', title: 'ZipCode' },
      { key: 'action', title: 'Action' }

    ];
    this.getAllStores();

    this.storeForm = this.fb.group({
      storeName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    })
  }
  getAllStores() {
    this.storeService.getAll()
      .subscribe({
        next: (res) => {
          this.categories = res;
          this.data = this.categories;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onEdit(row: any) {
    this.isEditMode = true;
    this.storeIdToUpdate = row.storeId;
    this.storeForm.setValue({
      storeName: row.storeName,
      phone: row.phone,
      email: row.email,
      street: row.street,
      city: row.city,
      state: row.state,
      zipCode: row.zipCode,
    })
  }

  addStore() {
    this.storeService.createStore(this.storeForm.value)
      .subscribe(res => {
        this.toast.success({ detail: "SUCCESS", summary: "Store Added!", duration: 2000 });
        this.getAllStores();
        this.storeForm.reset();
        document.getElementById("btn-close")?.click();
      });
  }

  updateStore() {
    let storeObj = {
      storeId: this.storeIdToUpdate,
      ...this.storeForm.value
    };
    this.storeService.updateStore(storeObj)
      .subscribe(res => {
        this.isEditMode = false;
        this.toast.success({ detail: "SUCCESS", summary: "Store Updated!", duration: 2000 });
        this.storeForm.reset();
        this.getAllStores();
        document.getElementById("btn-close")?.click();
      });
  }
}
