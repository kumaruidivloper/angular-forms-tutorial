import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormPersistenceService } from '../../../core/services/form-persistence.service';
import { CanDeactivateComponent } from '../../../core/gaurds/form.guard';

@Component({
  selector: 'app-user-form',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>User Information Form</mat-card-title>
        <mat-card-subtitle>Your progress is automatically saved</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <!-- Personal Information Section -->
          <div class="form-section">
            <h3>Personal Information</h3>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="Enter your first name">
                <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="Enter your last name">
                <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" placeholder="Enter your email">
                <mat-error *ngIf="userForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="userForm.get('email')?.hasError('email')">
                  Please enter a valid email address
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" placeholder="Enter your phone number">
              </mat-form-field>
            </div>
          </div>

          <!-- Address Section -->
          <div class="form-section" formGroupName="address">
            <h3>Address Information</h3>
            <mat-form-field appearance="outline">
              <mat-label>Street Address</mat-label>
              <input matInput formControlName="street" placeholder="Enter your street address">
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>City</mat-label>
                <input matInput formControlName="city" placeholder="Enter your city">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>State</mat-label>
                <input matInput formControlName="state" placeholder="Enter your state">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>ZIP Code</mat-label>
                <input matInput formControlName="zipCode" placeholder="Enter your ZIP code">
              </mat-form-field>
            </div>
          </div>

          <!-- Preferences Section -->
          <div class="form-section" formGroupName="preferences">
            <h3>Preferences</h3>
            <div class="checkbox-group">
              <mat-checkbox formControlName="newsletter">
                Subscribe to newsletter
              </mat-checkbox>
              <mat-checkbox formControlName="notifications">
                Enable notifications
              </mat-checkbox>
            </div>
          </div>

          <!-- Comments Section -->
          <div class="form-section">
            <h3>Additional Comments</h3>
            <mat-form-field appearance="outline">
              <mat-label>Comments</mat-label>
              <textarea matInput formControlName="comments" rows="4" 
                        placeholder="Enter any additional comments"></textarea>
            </mat-form-field>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="userForm.invalid || isSubmitting">
              <mat-icon *ngIf="isSubmitting">hourglass_empty</mat-icon>
              {{ isSubmitting ? 'Submitting...' : 'Submit Form' }}
            </button>
            
            <button mat-button type="button" (click)="clearForm()">
              Clear Form
            </button>
            
            @if(lastSaved) {
            <span class="save-indicator">
              <mat-icon>cloud_done</mat-icon>
              Last saved: {{ lastSaved | date:'short' }}
            </span>
            }
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-section {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h3 {
      margin-bottom: 16px;
      color: #424242;
      font-weight: 500;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .form-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .save-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #4caf50;
      font-size: 14px;
      margin-left: auto;
    }

    .save-indicator mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }
  `],
  standalone: false
})
export class UserFormComponent implements OnInit, OnDestroy, CanDeactivateComponent {
  userForm: FormGroup;
  isSubmitting = false;
  lastSaved: Date | null = null;
  private destroy$ = new Subject<void>();
  private hasUnsavedChanges = false;

  constructor(
    private fb: FormBuilder,
    private formPersistenceService: FormPersistenceService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadSavedFormState();
    this.setupAutoSave();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  canDeactivate(): boolean {
    if (this.hasUnsavedChanges && this.userForm.dirty) {
      // Save form state before leaving
      this.saveFormState();
    }
    return true;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      preferences: this.fb.group({
        newsletter: [false],
        notifications: [true]
      }),
      comments: ['']
    });
  }

  private loadSavedFormState(): void {
    this.formPersistenceService.loadFormState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedState) => {
          if (savedState) {
            this.userForm.patchValue(savedState.formData);
            this.lastSaved = new Date(savedState.lastModified);
            this.snackBar.open('Previous form data restored', 'Dismiss', { duration: 3000 });
          }
        },
        error: (error) => {
          console.error('Error loading saved form state:', error);
        }
      });
  }

  private setupAutoSave(): void {
    this.userForm.valueChanges
      .pipe(
        debounceTime(2000), // Wait 2 seconds after user stops typing
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.hasUnsavedChanges = true;
        this.saveFormState();
      });
  }

  private saveFormState(): void {
    if (this.userForm.pristine) return;

    this.formPersistenceService.saveFormState(this.userForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedState) => {
          this.lastSaved = new Date(savedState.lastModified);
          console.log(this.lastSaved)
          console.log(this.userForm.value)
          this.hasUnsavedChanges = false;
        },
        error: (error) => {
          console.error('Error saving form state:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      this.formPersistenceService.saveUserData(this.userForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (savedData) => {
            this.isSubmitting = false;
            this.hasUnsavedChanges = false;
            this.snackBar.open('Form submitted successfully!', 'Dismiss', { duration: 3000 });
            this.userForm.reset();
            this.userForm.patchValue({
              preferences: {
                newsletter: false,
                notifications: true
              }
            });
            this.lastSaved = null;
          },
          error: (error) => {
            this.isSubmitting = false;
            this.snackBar.open('Error submitting form. Please try again.', 'Dismiss', { duration: 3000 });
            console.error('Error submitting form:', error);
          }
        });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Dismiss', { duration: 3000 });
      this.markFormGroupTouched();
    }
  }

  clearForm(): void {
    this.userForm.reset();
    this.userForm.patchValue({
      preferences: {
        newsletter: false,
        notifications: true
      }
    });
    this.formPersistenceService.clearFormState().subscribe();
    this.lastSaved = null;
    this.hasUnsavedChanges = false;
    this.snackBar.open('Form cleared', 'Dismiss', { duration: 2000 });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      }
    });
  }
}