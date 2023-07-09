import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}product`)
  }

  createProduct(product: any) {
    return this.http.post<any>(`${baseUrl}product`, product);
  }

  updateProduct(product: any) {
    return this.http.put<any>(`${baseUrl}product`, product);
  }

  getByCategory(category: string) {
    return this.http.get<any>(`${baseUrl}product/byCategoryName?category=${category}`)
  }

  getByBrand(brand: string) {
    return this.http.get<any>(`${baseUrl}product/byBrandName/?brand=${brand}`)
  }

  getByModelYear(year: string){
    return this.http.get<any>(`${baseUrl}product/byModelYear/?modelYear=${year}`)
  }

}
