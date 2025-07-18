import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  accnumber: string
  title: string
  dob: string
  surname: string
  givenName: string
  gender: string
  address: string
  suburb: string
  state: string
  postcode: string
  contacNumber: string
  mobileNumber: string
  email: string
  toc: any[]
  reasonNameChange: any[]
  nctitle: string
  ncsurname: string
  ncgivenName: string
  newaddress: string
  newsuburb: string
  newstate: string
  newpostcode: string
  country: string
}

@Injectable({
  providedIn: 'root'
})

// https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit
export class EmployeeService {
  public baseURL: string = 'https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit';
  constructor(private _http: HttpClient) {}

  addEmployee(data: User): Observable<User> {
      return this._http.post<User>(this.baseURL, data);
  }

  updateEmployee(id: number, data: User): Observable<User> {
      return this._http.put<User>(this.baseURL+`/${id}`, data);
  }

  getEmployeeList(): Observable<User[]> {
    return this._http.get<User[]>(this.baseURL);
  }

  deleteEmployee(id: number): Observable<User> {
    return this._http.delete<User>(this.baseURL+`/${id}`);
  }
}
