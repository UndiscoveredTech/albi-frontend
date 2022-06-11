import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private http: HttpClient) { }
  
  // insert Settings

  // get all users
  getAllSettings(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

  insertNewSalary(salary: any): Observable<any>{
    return this.http.post(`${API_URL}`, salary);

  }
//   //get single user
//   getSingleEmployee(id: any): Observable<any>{
//     return this.http.get(`${API_URL}/${id}`)

//   }

//   //delete employee
//   deleteEmployee(employee: any): Observable<any>{
//     return this.http.delete(`${API_URL}/${employee._id}`)

//   }

  //update Settings
  updateSettings(settings: any): Observable<any>{
    return this.http.patch(`${API_URL}/`,settings);

  }



 
}