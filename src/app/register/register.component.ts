import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';
import { StaffService } from '../service/staff.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  staffs:any[] = [];
  stores:any[] = [];
  constructor(private fb: FormBuilder,
    private staffService: StaffService,
    private storeService: StoreService,
    private router: Router, private auth: AuthService, private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
  }

  register() {
    if (this.registerForm.valid) {
      this.auth.registerService(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['login']);
            this.toast.success({ detail: 'SUCCESS', summary: res.message, duration: 2000 });
            this.registerForm.reset();
          },
          error: (err) => {
            this.toast.error({ detail: 'ERROR', summary: err.error.message, duration: 2000 });
            console.log(err);
          }
        })
    }
  }

  getAllStaffs(){
    this.staffService.getAll()
    .subscribe(res=>{
      this.staffs = res.filter((a:any)=>{
        return a.managerId === 1 || a.managerId === null;
      });
    })
  }

  getAllStores(){
    this.storeService.getAll()
    .subscribe(res=>{
      this.stores = res;
    })
  }
}
