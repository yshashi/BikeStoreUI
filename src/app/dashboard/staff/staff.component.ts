import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public configuration!: Config;
  public columns: Columns[] = [];
  public data: any[] = [];
  staffs:any = [];
  constructor(private staffService: StaffService) { }
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
    this.getAllBrands();
  }
  getAllBrands() {
    this.staffService.getAll()
      .subscribe({
        next: (res:any) => {
          this.staffs = res;
          this.data = this.staffs;
          this.configuration = { ...DefaultConfig };
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  showRole(managerId: number){
    let role = "";
    if (managerId == null) {
      role = "Admin";
    }
    else {
      role = managerId == 1 ? "Stakeholder" : "Staff";
    }
    return role;
  }

}
