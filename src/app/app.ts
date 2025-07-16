import { AfterViewInit, Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { Core } from './core/core';
import { Emp } from './services/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CustomValidators } from './Validators/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  togglePre: boolean = true;
  protected title = 'Angular-Forms-Tutoriall';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource = new MatTableDataSource<Emp>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm!: FormGroup

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
    private fb: FormBuilder
  ) {

    this.myForm = this.fb.group({
      userDetails: this.fb.group({
        accnumber: ['', Validators.required],
        title: ['', Validators.required],
        dob: ['', Validators.required],
        surname: ['', Validators.required],
        givenName: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        suburb: ['', Validators.required],
        state: ['', Validators.required],
        postcode: ['', Validators.required],
        contacNumber: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
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
        newpostcode: ['', Validators.required],
        country: ['', Validators.required],
      })
    })
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
  }

  ngAfterViewInit(): void {
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



  // Helper method for empty slots (if you need consistent spacing)
  getEmptySlots(usedSlots: number): any[] {
    const maxSlots = 3; // or whatever your max is
    return new Array(maxSlots - usedSlots);
  }

  formSubmit() {
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
        next: (val: Emp) => {
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
