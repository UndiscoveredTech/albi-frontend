import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/staticmonth';
@Injectable({
  providedIn: 'root'
})
export class StaticMonthService {
  constructor(private http: HttpClient) { }
  
  // insert Employee
  insertEmployee(employee: any): Observable<any>{
    return this.http.post(`${API_URL}`,employee);

  }
  // get all users
  getAllMonthsYears(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

  getIdByMonthAndYear(month: any, year: any): Observable<any>{
    return this.http.get(`${API_URL}/getId/${month}/${year}`);
  }

}