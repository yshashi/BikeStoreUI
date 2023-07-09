import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}store`)
  }

  createStore(store: any){
    return this.http.post<any>(`${baseUrl}store`, store);
  }

  updateStore(store: any) {
    return this.http.put<any>(`${baseUrl}store`, store);
  }
}
