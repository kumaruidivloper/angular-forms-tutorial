import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
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
    }
  }
}
