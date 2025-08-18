import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, FormStateData } from './../interface/user'

@Injectable({
  providedIn: 'root'
})

// https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit
export class EmployeeService {
  public baseURL: string = 'https://6875a09b814c0dfa6539009e.mockapi.io/api/v1/formSubmit';
  private fallbackStorage = new Map<string, FormStateData>();
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

   // Simulate JSON server with in-memory storage for demo
  saveFormState(formState: FormStateData): Observable<FormStateData> {
    // In real app, this would be: return this.http.post<FormStateData>(`${this.baseUrl}/form-states`, formState);
    this.fallbackStorage.set(formState.id, formState);
    return of(formState);
  }

   getFormState(id: string): Observable<FormStateData | null> {
    // In real app, this would be: return this.http.get<FormStateData>(`${this.baseUrl}/form-states/${id}`);
    const state = this.fallbackStorage.get(id);
    return of(state || null);
  }

  deleteFormState(id: string): Observable<void> {
    // In real app, this would be: return this.http.delete<void>(`${this.baseUrl}/form-states/${id}`);
    this.fallbackStorage.delete(id);
    return of(void 0);
  }

  saveUserData(userData: User): Observable<User> {
    // In real app, this would be: return this.http.post<UserFormData>(`${this.baseUrl}/users`, userData);
    return this._http.post<User>(this.baseURL, userData);
    const savedData = { ...userData, id: Date.now().toString() };
    return of(savedData);
  }
}
