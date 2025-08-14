import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { EmployeeService } from './employee';
import { FormStateData, User } from './../interface/user'

@Injectable({
  providedIn: 'root'
})
export class FormPersistenceService {
  private readonly FORM_STATE_KEY = 'user-form-state';
  private readonly USER_ID = 'current-user'; // In real app, this would come from auth service

  constructor(private employeeService: EmployeeService) {}

  saveFormState(form: FormGroup): Observable<FormStateData> {
    const formState: FormStateData = {
      id: this.FORM_STATE_KEY,
      userId: this.USER_ID,
      formData: form.value as User,
      lastModified: new Date().toISOString()
    };

    return this.employeeService.saveFormState(formState);
  }

  loadFormState(): Observable<FormStateData | null> {
    return this.employeeService.getFormState(this.FORM_STATE_KEY);
  }

  clearFormState(): Observable<void> {
    return this.employeeService.deleteFormState(this.FORM_STATE_KEY);
  }

  saveUserData(userData: User): Observable<User> {
    return this.employeeService.saveUserData(userData).pipe(
      tap(() => this.clearFormState().subscribe()) // Clear saved state after successful submission
    );
  }
}