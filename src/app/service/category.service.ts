import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${baseUrl}category`)
  }

  createcategory(category: any) {
    return this.http.post<any>(`${baseUrl}category`, category);
  }

  updatecategory(category: any) {
    return this.http.put<any>(`${baseUrl}category`, category);
  }
}
