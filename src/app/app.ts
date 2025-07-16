import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEdit } from './emp-add-edit/emp-add-edit';
import { EmployeeService } from './services/employee';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Core } from './core/core';
import { Emp } from './services/employee';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CustomValidators } from './Validators/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
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
    private _dialog: MatDialog, 
    private _empService: EmployeeService,
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

  onCheckboxChange(event: any, value: string, type: string) {
    if(type === 'toc') {
        const currentValues = this.typeOfChangeReqControl.value || [];
      
      if (event.checked) {
        if (!currentValues.includes(value)) {
          const newValues = [...currentValues, value];
          this.typeOfChangeReqControl.setValue(newValues);
        }
      } else {
        const newValues = currentValues.filter((item: string) => item !== value);
        this.typeOfChangeReqControl.setValue(newValues);
      }
      
      // Force validation update
      this.typeOfChangeReqControl.updateValueAndValidity();
    } else {
         const currentValues = this.reasonNameChangeControl.value || [];
      
      if (event.checked) {
        if (!currentValues.includes(value)) {
          const newValues = [...currentValues, value];
          this.reasonNameChangeControl.setValue(newValues);
        }
      } else {
        const newValues = currentValues.filter((item: string) => item !== value);
        this.reasonNameChangeControl.setValue(newValues);
      }
      
      // Force validation update
      this.reasonNameChangeControl.updateValueAndValidity();
    }
      
  }

  ngOnInit(): void {
      this.getEmployeeList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEdit);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
  this._empService.getEmployeeList().subscribe({
    next: (res: Emp[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: (err: any) => {
      console.error('Failed to fetch employee list:', err);
    }
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        //alert('Employee Delete !!!');
        this._coreService.openSanckBar('Employee Delete !!!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    })
  }


  openEditEmpForm(data: Emp) {
    const dialogRef = this._dialog.open(EmpAddEdit, {
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      }
    })
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
}

}
