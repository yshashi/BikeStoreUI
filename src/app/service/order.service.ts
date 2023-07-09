import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}order`);
  }

  getOrderById(id: number){
    return this.http.get<any>(`${baseUrl}order/${id}`)
  }
}
