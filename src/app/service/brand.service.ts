import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}brands`)
  }
  createbrand(brand: any) {
    return this.http.post<any>(`${baseUrl}brands`, brand);
  }

  updatebrand(brand: any) {
    return this.http.put<any>(`${baseUrl}brands`, brand);
  }
}
