import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { StaffService } from 'src/app/service/staff.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];
  staffs: any = [];
  staffsDropdown:any[] = [];
  stores: any[] = [];
  staffForm!: FormGroup;
  isEditMode = false;
  staffIfToUpdate = 0;
  constructor(private staffService: StaffService, private fb: FormBuilder,private toast: NgToastService, private storeService: StoreService) { }
  ngOnInit() {
    this.columns = [
      { key: 'staffId', title: 'Staff ID' },
      { key: 'firstName', title: 'Firstname' },
      { key: 'lastName', title: 'Lastname' },
      { key: 'email', title: 'Email' },
      { key: 'phone', title: 'Phone' },
      { key: 'active', title: 'Active' },
      { key: 'storeId', title: 'Store ID' },
      { key: 'managerId', title: 'Role' },

    ];
    this.staffForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      active: ['', Validators.required],
      storeId: ['', Validators.required],
      managerId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.getAllStaffs();
    this.getAllStores();
    this.getAllManagers();
  }
  getAllStaffs() {
    this.staffService.getAll()
      .subscribe({
        next: (res: any) => {
          this.staffs = res;
          this.data = this.staffs;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getAllManagers() {
    this.staffService.getAll()
      .subscribe(res => {
        this.staffsDropdown = res.filter((a: any) => {
          return a.managerId === 1 || a.managerId === null;
        });
      })
  }
  showRole(managerId: number) {
    let role = "";
    if (managerId == null) {
      role = "Admin";
    }
    else {
      role = managerId == 1 ? "Stakeholder" : "Staff";
    }
    return role;
  }

  getAllStores() {
    this.storeService.getAll()
      .subscribe(res => {
        this.stores = res;
      })
  }

  onEdit(row: any) {
    this.isEditMode = true;
    this.staffIfToUpdate = row.staffId;
    this.staffForm.setValue({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      active: row.active,
      storeId: row.storeId,
      managerId: row.managerId,
      password: row.password
    })
  }

  onAdd(){
    this.isEditMode = false;
    this.staffForm.reset();
  }

  addStaff() {
    this.staffService.createStaff(this.staffForm.value)
    .subscribe(res=>{
      this.toast.success({detail:"SUCCESS", summary:"Staff Added", duration:2000});
      this.staffForm.reset();
      document.getElementById("close")?.click();
      this.getAllStaffs();
    })
  }

  updateStaff(){
    const staffObj = {
      ...this.staffForm.value,
      staffId: this.staffIfToUpdate
    }

    this.staffService.updateStaff(staffObj)
    .subscribe(res=>{
      this.isEditMode = false;
      this.toast.success({ detail: "SUCCESS", summary: "Staff Updated", duration: 2000 });
      this.staffForm.reset();
      document.getElementById("close")?.click();
      this.getAllStaffs();
    })
  }

}
