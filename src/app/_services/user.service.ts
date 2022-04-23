import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }




  // get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }

  //get single user
  getSingleUser(id: any): Observable<any>{
    return this.http.get(`${API_URL}/${id}`)

  }


  //associate user to a company
  associateUser(userId:any, companyId: any){
    return this.http.patch(`${API_URL}/${userId}/${companyId}`,{})


  }
}