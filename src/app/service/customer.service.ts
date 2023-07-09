import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}customer`)
  }

  getByCity(city: string) {
    return this.http.get<any>(`${baseUrl}customer/bycity?city=${city}`)
  }

  getByZipcode(zipCode: string) {
    return this.http.get<any>(`${baseUrl}customer/zipcode/?zipCode=${zipCode}`)
  }

  createCustomer(customer: any) {
    return this.http.post<any>(`${baseUrl}customer`, customer)
  }

  updateCustomer(customer: any){
    return this.http.put<any>(`${baseUrl}customer`, customer)
  }
}
