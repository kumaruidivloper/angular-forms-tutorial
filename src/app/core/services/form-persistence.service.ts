import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { JsonServerService } from './json-server.service';
import { FormStateData, UserFormData } from '../models/form-data.model';

@Injectable({
  providedIn: 'root'
})
export class FormPersistenceService {
  private readonly FORM_STATE_KEY = 'user-form-state';
  private readonly USER_ID = 'current-user'; // In real app, this would come from auth service

  constructor(private jsonServerService: JsonServerService) {}

  saveFormState(form: FormGroup): Observable<FormStateData> {
    const formState: FormStateData = {
      id: this.FORM_STATE_KEY,
      userId: this.USER_ID,
      formData: form.value as UserFormData,
      lastModified: new Date().toISOString()
    };

    return this.jsonServerService.saveFormState(formState);
  }

  loadFormState(): Observable<FormStateData | null> {
    return this.jsonServerService.getFormState(this.FORM_STATE_KEY);
  }

  clearFormState(): Observable<void> {
    return this.jsonServerService.deleteFormState(this.FORM_STATE_KEY);
  }

  saveUserData(userData: UserFormData): Observable<UserFormData> {
    return this.jsonServerService.saveUserData(userData).pipe(
      tap(() => this.clearFormState().subscribe()) // Clear saved state after successful submission
    );
  }
}