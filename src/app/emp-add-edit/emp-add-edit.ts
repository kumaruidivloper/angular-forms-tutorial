import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone: false,
  templateUrl: './emp-add-edit.html',
  styleUrl: './emp-add-edit.scss'
})
export class EmpAddEdit {
  empForm: FormGroup;

  public education: string[] =[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ] 

  constructor(private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: DialogRef<EmpAddEdit>
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully')
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }
}
