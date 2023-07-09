import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { baseUrl } from '../api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginService(loginObj: any) {
    return this.http.post<any>(`${baseUrl}auth/login`, loginObj);
  }

  registerService(registerObj: any) {
    return this.http.post<any>(`${baseUrl}auth/register`, registerObj);
  }

  getDecodedToken(){
    const token = localStorage.getItem("token")!;
    const helper = new JwtHelperService();
    if(token){
      return helper.decodeToken(token);
    }
  }

}
