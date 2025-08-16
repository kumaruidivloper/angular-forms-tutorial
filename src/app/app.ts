import { FormPersistenceService } from './services/form-persistence.service';
import { AfterViewInit, Component, OnInit, Inject, Optional, OnDestroy } from '@angular/core';
import { EmployeeService } from './services/employee';
import { Core } from './core/core';
import { User } from './interface/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { CustomValidators } from './Validators/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from './services/localStorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  togglePre: boolean = true;
  protected title = 'Angular-Forms-Tutoriall';
  isAddcontactEnable: boolean = false;
  addContactDisabled: boolean = false;
  index: number = 0;
  private destroy$ = new Subject<void>();
  private hasUnsavedChanges = false;
  lastSaved: Date | null = null;
  isSubmitting = false;
  private readonly STORAGE_KEY = 'userFormData';
  private readonly AUTO_SAVE_DELAY = 1000;

  myForm!: FormGroup

  // Generic error message configuration
  private errorMessages: { [key: string]: { [key: string]: string } } = {
    'userDetails.accnumber': {
      required: 'Account number is required',
      pattern: 'Account number must containe 9 digit'
    },
    'userDetails.title': {
      required: 'Title is required'
    },
    'userDetails.dob': {
      required: 'Date of birth is required'
    },
    'userDetails.surname': {
      required: 'Surname is required',
      minlength: 'Surname must be at least 2 characters',
      maxlength: 'Surname cannot exceed 50 characters'
    },
    'userDetails.givenName': {
      required: 'Given name is required',
      minlength: 'Given name must be at least 2 characters',
      maxlength: 'Given name cannot exceed 50 characters'
    },
    'userDetails.gender': {
      required: 'Gender is required'
    },
    'userDetails.address': {
      required: 'Address is required'
    },
    'userDetails.suburb': {
      required: 'Suburb is required'
    },
    'userDetails.state': {
      required: 'State is required'
    },
    'userDetails.postcode': {
      required: 'Postcode is required',
      pattern: 'Postcode must be 4 digits',
      minlength: 'Postcode must be 4 digits',
      maxlength: 'Postcode must be 4 digits'
    },
    'userDetails.contacNumber': {
      required: 'Contact number is required',
      pattern: 'Contact number format is invalid'
    },
    'userDetails.mobileNumber': {
      required: 'Mobile number is required',
      pattern: 'Mobile number format is invalid'
    },
    'userDetails.email': {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    'userDetails.toc': {
      atLeastOneRequired: 'Please select at least one type of change'
    },
    'userDetails.reasonNameChange': {
      atLeastOneRequired: 'Please select at least one reason for name change'
    },
    'userDetails.nctitle': {
      required: 'New title is required'
    },
    'userDetails.ncsurname': {
      required: 'New surname is required'
    },
    'userDetails.ncgivenName': {
      required: 'New given name is required'
    },
    'userDetails.newaddress': {
      required: 'New address is required'
    },
    'userDetails.newsuburb': {
      required: 'New suburb is required'
    },
    'userDetails.newstate': {
      required: 'New state is required'
    },
    'userDetails.newpostcode': {
      required: 'New postcode is required',
      pattern: 'New postcode must be 4 digits'
    },
    'userDetails.country': {
      required: 'Country is required'
    }
  };

   // Field display names for dynamic error generation
  private fieldDisplayNames: { [key: string]: string } = {
    'userDetails.accnumber': 'Account Number',
    'userDetails.title': 'Title',
    'userDetails.dob': 'Date of Birth',
    'userDetails.surname': 'Surname',
    'userDetails.givenName': 'Given Name',
    'userDetails.gender': 'Gender',
    'userDetails.address': 'Address',
    'userDetails.suburb': 'Suburb',
    'userDetails.state': 'State',
    'userDetails.postcode': 'Postcode',
    'userDetails.contacNumber': 'Contact Number',
    'userDetails.mobileNumber': 'Mobile Number',
    'userDetails.email': 'Email',
    'userDetails.toc': 'Type of Change',
    'userDetails.reasonNameChange': 'Reason for Name Change',
    'userDetails.nctitle': 'New Title',
    'userDetails.ncsurname': 'New Surname',
    'userDetails.ncgivenName': 'New Given Name',
    'userDetails.newaddress': 'New Address',
    'userDetails.newsuburb': 'New Suburb',
    'userDetails.newstate': 'New State',
    'userDetails.newpostcode': 'New Postcode',
    'userDetails.country': 'Country'
  };

  public states: string[] =[
    'South Australia',
    'Tasmania',
    'Western Australia',
    'Victoria',
    'New South Wales',
    'Queensland'
  ] 

  public titleNames: string[] =[
    'Mr.',
    'Mrs.',
    'Miss.',
    'Ms.',
    'Mx.',
    'Dr.',
    'Prof.',
    'Rev.',
    'Fr.',
    'Sir',
    'Madam / Dame',
    'Master'
  ] 

  constructor(
    private _empService: EmployeeService,
    @Optional() private _dialogRef: MatDialogRef<App>, // Make optional
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, // Make optional
    private _coreService: Core,
    private formPersistenceService: FormPersistenceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {

    this.myForm = this.fb.group({
      userDetails: this.fb.group({
        hasContacts: [false],
        accnumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        title: ['', Validators.required],
        dob: ['', Validators.required],
        surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        givenName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        suburb: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        contacNumber: ['', [Validators.required, Validators.pattern(/^[0-9\s\-\+\(\)]+$/)]],
        mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9\s\-\+\(\)]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        toc: [[], CustomValidators.atLeastOneSelected],
        reasonNameChange: [[], CustomValidators.atLeastOneSelected],
        //Inline Validator
        // reasonNameChange: [[], [Validators.required,(control: AbstractControl) => {
        //           return control.value && control.value.length > 0 ? null : { required: true };
        // }]],
        nctitle: ['', Validators.required],
        ncsurname: ['', Validators.required],
        ncgivenName: ['', Validators.required],
        newaddress: ['', Validators.required],
        newsuburb: ['', Validators.required],
        newstate: ['', Validators.required],
        newpostcode: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        country: ['', Validators.required],
        contacts: this.fb.array([])
      })
    })
  }

  trackById(item: any): number {
    console.log(item.controls.id.value)
    return item.controls.id.value;
  }

  get hasContactsControl(): AbstractControl | null {
    const userDetails = this.myForm.get('userDetails') as FormGroup;
    return userDetails.get('hasContacts')?.value || false;
  }

  get contacts() {
    const userDetails = this.myForm.get('userDetails') as FormGroup;
    return userDetails.get('contacts') as FormArray;
  }

  addContact(event: Event) {
    this.createNewContact();
    console.log(this.contacts.length)
    this.addContactDisabled = this.contacts.length === 5 ? true : false;
    event.preventDefault();
  }

  createContactGroup() {
    this.createNewContact();
  }

  createNewContact() {
    this.index++;
    this.contacts.push(
      this.fb.group({
        id:[this.index],
        number: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        type: ['', Validators.required],
        description: ['', Validators.required],
      })
    )
  }

  // Mark all fields with values as touched
markTouchedForFieldsWithValues() {
  const userDetailsGroup = this.myForm.get('userDetails') as FormGroup;
  
  Object.keys(userDetailsGroup.controls).forEach(key => {
    const control = userDetailsGroup.get(key);
    
    if (control && control.value) {
      control.markAsTouched();
    }
  });
}

  /**
   * Save form data to localStorage with 1-hour expiration
   */
  saveFormData(): void {
    if (this.myForm.dirty) {
      const formValue = this.myForm.value;
      this.localStorageService.setItem(this.STORAGE_KEY, formValue, 1); // 1 hour expiration
      console.log('Form data saved to localStorage');
    }
  }


  /**
   * Load form data from localStorage if available and not expired
   */
  private loadFormData(): void {
    const savedData = this.localStorageService.getItem(this.STORAGE_KEY);
    
    if (savedData && savedData.userDetails) {
      try {
        // Load the basic form values
        this.myForm.patchValue(savedData, { emitEvent: false });
        
        // Handle FormArray for contacts separately
        if (savedData.userDetails.contacts && Array.isArray(savedData.userDetails.contacts)) {
          this.loadContactsFormArray(savedData.userDetails.contacts);
        }
        
        console.log('Form data loaded from localStorage');
      } catch (error) {
        console.error('Error loading form data:', error);
        // Clear corrupted data
        this.localStorageService.removeItem(this.STORAGE_KEY);
      }
    }
  }

  /**
   * Load contacts into FormArray
   */
  private loadContactsFormArray(contacts: any[]): void {
    const contactsArray = this.myForm.get('userDetails.contacts') as FormArray;
    
    // Clear existing contacts
    while (contactsArray.length !== 0) {
      contactsArray.removeAt(0);
    }
    
    // Add saved contacts
    contacts.forEach(contact => {
      const contactGroup = this.fb.group({
        id: [contact.id || null],
        number: [contact.number || '', Validators.required],
        type: [contact.type || '', Validators.required],
        description: [contact.description || '']
      });
      
      contactsArray.push(contactGroup);
    });
  }

  enableAddContact() {
    this.isAddcontactEnable = !this.isAddcontactEnable
  }
 
  deleteContacts(index: number, event: Event) {
    this.contacts.removeAt(index);
    this.addContactDisabled = this.contacts.length < 5 ? false : true;
    event.preventDefault();
  }

  private setupAutoSave(): void {
    this.myForm.valueChanges
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
    if (this.myForm.pristine) return;

    this.formPersistenceService.saveFormState(this.myForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedState) => {
          this.lastSaved = new Date(savedState.lastModified);
          this.cdr.detectChanges(); // Or this.cdr.markForCheck()
          this.saveFormData();
          console.log(this.lastSaved)
          console.log(this.myForm.value)
          this.hasUnsavedChanges = false;
        },
        error: (error) => {
          console.error('Error saving form state:', error);
        }
      });
  }

  private loadSavedFormState(): void {
    this.formPersistenceService.loadFormState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (savedState) => {
          if (savedState) {
            this.myForm.patchValue(savedState.formData);
            this.lastSaved = new Date(savedState.lastModified);
            this.snackBar.open('Previous form data restored', 'Dismiss', { duration: 3000 });
          }
        },
        error: (error) => {
          console.error('Error loading saved form state:', error);
        }
      });
  }

  /**
   * Generic method to get error message for any form field
   * @param fieldPath - The path to the form field (e.g., 'userDetails.email')
   * @returns The error message string or null if no error
   */
  getErrorMessage(fieldPath: string): string | null {
    const control = this.myForm.get(fieldPath);
    
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    const errors = control.errors;
    const fieldErrors = this.errorMessages[fieldPath];

    // Check for specific error messages first
    if (fieldErrors) {
      for (const errorType in errors) {
        if (fieldErrors[errorType]) {
          return fieldErrors[errorType];
        }
      }
    }

    // Fallback to generic error messages
    return this.getGenericErrorMessage(fieldPath, errors);
  }

  /**
   * Generate generic error messages when specific ones are not defined
   * @param fieldPath - The path to the form field
   * @param errors - The errors object from the form control
   * @returns A generic error message
   */
  private getGenericErrorMessage(fieldPath: string, errors: any): string {
    const fieldName: string | undefined = this.capitalizeFirstLetter(this.fieldDisplayNames[fieldPath] || fieldPath.split('.').pop()) 
    
    if (errors['required']) {
      return `${fieldName} is required`;
    }
    if (errors['email']) {
      return `Please enter a valid ${fieldName?.toLowerCase()}`;
    }
    if (errors['minlength']) {
      return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `${fieldName} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['pattern']) {
      return `${fieldName} format is invalid`;
    }
    if (errors['atLeastOneRequired']) {
      return `Please select at least one ${fieldName?.toLowerCase()}`;
    }
    
    return `${fieldName} is invalid`;
  }

  capitalizeFirstLetter(str: string | undefined) {
    if (!str) return ''; // handle empty or null string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Check if a field has errors and is touched
   * @param fieldPath - The path to the form field
   * @returns true if field has errors and is touched
   */
  hasFieldError(fieldPath: string): boolean {
    const control = this.myForm.get(fieldPath);
    return !!(control && control.errors && control.touched);
  }

  /**
   * Get all error messages for a field (useful for fields with multiple validations)
   * @param fieldPath - The path to the form field
   * @returns Array of error messages
   */
  getAllErrorMessages(fieldPath: string): string[] {
    const control = this.myForm.get(fieldPath);
    
    if (!control || !control.errors || !control.touched) {
      return [];
    }

    const errors = control.errors;
    const fieldErrors = this.errorMessages[fieldPath];
    const messages: string[] = [];

    for (const errorType in errors) {
      if (fieldErrors && fieldErrors[errorType]) {
        messages.push(fieldErrors[errorType]);
      } else {
        messages.push(this.getGenericErrorMessage(fieldPath, { [errorType]: errors[errorType] }));
      }
    }

    return messages;
  }

  get typeOfChangeReqControl(): FormControl {
  return this.myForm.get('userDetails.toc') as FormControl;
  }

  get reasonNameChangeControl(): FormControl {
  return this.myForm.get('userDetails.reasonNameChange') as FormControl;
  }

  onCheckboxChange(event: any, value: string, type: string): void {
      const control = type === 'toc' ? this.typeOfChangeReqControl : this.reasonNameChangeControl;
      const currentValues = control.value || [];
      const newValues = event.checked ? this.addValueToArray(currentValues, value) : this.removeValueFromArray(currentValues, value);
      control.setValue(newValues);
      control.updateValueAndValidity();
  }

  private addValueToArray(array: string[], value: string): string[] {
    return array.includes(value) ? array : [...array, value];
  }

  private removeValueFromArray(array: string[], value: string): string[] {
    return array.filter(item => item !== value);
  }

  ngOnInit(): void {
    this.loadFormData();
    this.markTouchedForFieldsWithValues();
    const userDetials = this.myForm.get('userDetails') as FormGroup;
    userDetials.get('hasContacts')?.valueChanges.subscribe(hasContacts => {
      console.log(this.contacts.value)
      if(hasContacts && this.contacts.value === 0) {
        this.contacts.push(this.createContactGroup());
      } else if (!hasContacts) {
        this.contacts.clear();
        this.addContactDisabled = false;
      }
    });

    this.loadSavedFormState();
    this.setupAutoSave();
  }

   ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
  }

  markAsTouched(controlName: string) {
    this.myForm.get(controlName)?.markAsTouched();
  }

typeOfChangeReq = [
  [
    { value: 'name', label: 'Name' },
    { value: 'address', label: 'Address' },
    { value: 'email', label: 'Email address' }
  ],
  [
    { value: 'phoneNumber', label: 'Contact phone number' },
    { value: 'dob', label: 'Date of birth' }
  ]
];

reasonNameChange = [
  {value: 'marriage' , label: 'Marriage - certified copy of the marriage certificate issued by the Registry of Birth, Deaths and Marriages.'},
  {value: 'deedpoll', label: 'Deed poll - a certified copy of the change of name registration certificate.'},
  {value: 'reverttomaidenname', label: 'Revert to maiden name - documents that show a clear link between your current name and your new name (eg a certified copy of the marriage certificate issued by the Registry of Births, Deaths and Marriages).'},
  {value: 'incorrectspellingofname', label: 'Incorrect spelling of name'},
  {value: 'knowbyname', label: 'Know by name'},
]

  formSubmit() {
    this.formPersistenceService.saveUserData(this.myForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (savedData) => {
            this.isSubmitting = false;
            this.hasUnsavedChanges = false;
            this.snackBar.open('Form submitted successfully!', 'Dismiss', { duration: 3000 });
            this.myForm.reset();
            this.myForm.patchValue({
              // preferences: {
              //   newsletter: false,
              //   notifications: true
              // }
            });
            this.lastSaved = null;
          },
          error: (error) => {
            this.isSubmitting = false;
            this.snackBar.open('Error submitting form. Please try again.', 'Dismiss', { duration: 3000 });
            console.error('Error submitting form:', error);
          }
        });
    // Mark all fields as touched to show validation errors
    this.myForm.markAllAsTouched();
    
    // if (this.myForm.valid) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', this.myForm.value);
    // } else {
      // console.log('Form is invalid');
      // console.log('reasonNameChange errors:', this.typeOfChangeReqControl.errors);
    // }

    this._empService.addEmployee(this.myForm.value).subscribe({
        next: (val: User) => {
          //alert('Employee added successfully')
          this._coreService.openSanckBar('User Details added successfully');       
          if (this._dialogRef && typeof this._dialogRef.close === 'function') {
              this._dialogRef.close(true);
          }
          console.table(this.myForm.value)
        },
        error: (err: any) => {
          console.error(err)
        }
      }) 
  }

}
