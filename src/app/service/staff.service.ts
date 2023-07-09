import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

constructor(private http: HttpClient) { }

getAll(){
  return this.http.get<any>(`${baseUrl}staff`)
}

}
