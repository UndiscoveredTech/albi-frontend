import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/company/';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }
  
  // get all company
  getAllCompany(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }
  
  // create company
  createCompany(company:any): Observable<any> {
    return this.http.post(`${API_URL}`, company)
  }

  //getSingleComapny
  singleCompany(companyId: any): Observable<any>{
    return this.http.get(`${API_URL}/${companyId}`)
  }

  //delete company
  deleteCompany(company: any): Observable<any>{
    return this.http.delete(`${API_URL}/${company._id}`)
  }

  //updateCompany
  updateCompany(company: any): Observable<any>{
    return this.http.patch(`${API_URL}/${company._id}`,company);

  }
  
}