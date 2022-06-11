import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }
  
  // insert Employee
  insertEmployee(employee: any): Observable<any>{
    return this.http.post(`${API_URL}`,employee);

  }
  // get all users
  getAllEmployees(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

  //get single user
  getSingleEmployee(id: any): Observable<any>{
    return this.http.get(`${API_URL}/${id}`)

  }

  //delete employee
  deleteEmployee(employee: any): Observable<any>{
    return this.http.delete(`${API_URL}/${employee._id}`)

  }

  //update Employee
  updateEmployee(employee: any): Observable<any>{
    return this.http.patch(`${API_URL}/`,employee);

  }
  //associate user to a company
  associateUser(userId:any, companyId: any){
    return this.http.patch(`${API_URL}/${userId}/${companyId}`,{})


  }

  //completeEmployee with other attributes
  completeEmployee(calculation: any): Observable<any>{
    return this.http.post(`${API_URL}/completeEmployee`,{calculation})

  }


  //get Calculation data to load 
  getCalculationForUserAndYearMonth(monthYear: any, userId: any): Observable<any>{
    return this.http.get(`${API_URL}/employCalculation/${monthYear}/${userId}`)

  }

 
}