import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Emp {
  firstName: string
  lastName: string
  email: string
  dob: string
  gender: string
  education: string
  company: string
  experience: number
  package: number
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  addEmployee(data: Emp): Observable<Emp> {
      return this._http.post<Emp>('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: Emp): Observable<Emp> {
      return this._http.put<Emp>(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<Emp[]> {
    return this._http.get<Emp[]>('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<Emp> {
    return this._http.delete<Emp>(`http://localhost:3000/employees/${id}`);
  }


}
