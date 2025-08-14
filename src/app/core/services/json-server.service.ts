import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormStateData, UserFormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root'
})
export class JsonServerService {
  private baseUrl = 'http://localhost:3000'; // Fake JSON Server URL
  private fallbackStorage = new Map<string, FormStateData>();

  constructor(private http: HttpClient) {}

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

  saveUserData(userData: UserFormData): Observable<UserFormData> {
    // In real app, this would be: return this.http.post<UserFormData>(`${this.baseUrl}/users`, userData);
    const savedData = { ...userData, id: Date.now().toString() };
    return of(savedData);
  }
}