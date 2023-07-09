import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { NgToastService } from "ng-angular-popup";

export const AuthGuard = ()=>{
  const router = inject(Router);
  const toast = inject(NgToastService);
  const isLoggedIn = !!localStorage.getItem("token")
  if(isLoggedIn){
    return true
  }else{
    toast.error({summary:"Kindly Login first", detail:"ERROR", duration:2000})
    router.navigate(['/'])
    return false
  }
}
