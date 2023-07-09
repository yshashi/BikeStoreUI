import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    localStorage.clear();
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.loginService(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.toast.success({summary:"Logged In Successfully!", detail:"SUCCESS", duration: 3000})
            this.router.navigate(['home']);
            localStorage.setItem("token", res.token)
          }, error: (err) => {
            console.log(err);
          }
        })
    }
  }


}
