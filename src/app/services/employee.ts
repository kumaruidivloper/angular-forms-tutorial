import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export interface Emp {
//   firstName: string
//   lastName: string
//   email: string
//   dob: string
//   gender: string
//   education: string
//   company: string
//   experience: number
//   package: number
//   id: string
// }

export interface Emp {
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
//JSON Server
// export class EmployeeService {
//   constructor(private _http: HttpClient) {}

//   addEmployee(data: Emp): Observable<Emp> {
//       return this._http.post<Emp>('http://localhost:3000/employees', data);
//   }

//   updateEmployee(id: number, data: Emp): Observable<Emp> {
//       return this._http.put<Emp>(`http://localhost:3000/employees/${id}`, data);
//   }

//   getEmployeeList(): Observable<Emp[]> {
//     return this._http.get<Emp[]>('http://localhost:3000/employees');
//   }

//   deleteEmployee(id: number): Observable<Emp> {
//     return this._http.delete<Emp>(`http://localhost:3000/employees/${id}`);
//   }
// }

// https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit
export class EmployeeService {
  public baseURL: string = 'https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit';
  constructor(private _http: HttpClient) {}

  addEmployee(data: Emp): Observable<Emp> {
      return this._http.post<Emp>(this.baseURL, data);
  }

  updateEmployee(id: number, data: Emp): Observable<Emp> {
      return this._http.put<Emp>(this.baseURL+`/${id}`, data);
  }

  getEmployeeList(): Observable<Emp[]> {
    return this._http.get<Emp[]>(this.baseURL);
  }

  deleteEmployee(id: number): Observable<Emp> {
    return this._http.delete<Emp>(this.baseURL+`/${id}`);
  }
}
