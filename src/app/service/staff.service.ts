import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../api.config';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

constructor(private http: HttpClient) { }

getAll(){
  return this.http.get<any>(`${baseUrl}staff`)
}

// getStoreIdByStaffId(staffId: number){
//   return this.http.get<any>(`${baseUrl}staff`)
//   .pipe(map((a:any)=>{
//     return a.filter((b:any)=>{
//       return b.staffId === staffId
//     })

//   }))
// }

createStaff(staff: any){
  return this.http.post<any>(`${baseUrl}staff`, staff)
}
  updateStaff(staff: any) {
    return this.http.put<any>(`${baseUrl}staff`, staff)
  }
}
