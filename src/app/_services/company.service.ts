import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/company/';
const API_URL_MONTHS = 'http://localhost:8080/staticMonth';

const API_URL_EXPORT_EXCEL = 'http://localhost:8080/user/downloadExcel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }
  
  // get all companys
  getAllCompany(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

   // get all months
   getAllMonths(): Observable<any> {
    return this.http.get(`${API_URL_MONTHS}`);
  }
  
  // create company
  createCompany(company:any): Observable<any> {
    return this.http.post(`${API_URL}`, company)
  }

  //getSingleComapny
  singleCompany(companyId: any, selectedMonthId?: any): Observable<any>{
    return this.http.get(`${API_URL}/${companyId}/${selectedMonthId}`)
  }

  //delete company
  deleteCompany(company: any): Observable<any>{
    return this.http.delete(`${API_URL}/${company._id}`)
  }

  //updateCompany
  updateCompany(company: any): Observable<any>{
    return this.http.patch(`${API_URL}/${company._id}`,company);

  }

   //get Excel exported data ALLUSERS

   getExcelForUsers(monthId: any): any {
     
    return this.http.get(`${API_URL_EXPORT_EXCEL}/${monthId}`, { responseType: 'blob', headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}});

  }

   //get Excel exported data ONLYUSER

   getExcelForOnlyUser(monthId: any, userId: any): any {    

   return this.http.get(`${API_URL_EXPORT_EXCEL}/${monthId}/${userId}`, { responseType: 'blob', headers: {'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}});

 }
  
}