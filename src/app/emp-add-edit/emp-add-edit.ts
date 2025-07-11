import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Core } from '../core/core';
import { Emp } from '../services/employee';

@Component({
  selector: 'app-emp-add-edit',
  standalone: false,
  templateUrl: './emp-add-edit.html',
  styleUrl: './emp-add-edit.scss'
})
export class EmpAddEdit implements OnInit {
  empForm: FormGroup;

  public education: string[] =[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ] 

  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEdit>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: Core
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
      if(this.data) {
        console.log(this.empForm.value);
            this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
              next: (val: Emp) => {
                // alert('Employee detail Updated !!!')
                this._coreService.openSanckBar('Employee detail Updated !!!');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err)
              }
            }) 
      } else {
          console.log(this.empForm.value);
            this._empService.addEmployee(this.empForm.value).subscribe({
              next: (val: Emp) => {
                //alert('Employee added successfully')
                this._coreService.openSanckBar('Employee added successfully');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err)
              }
            }) 
      }
    }
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }
}
