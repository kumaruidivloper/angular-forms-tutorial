import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss'
})
export class App {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employees: this.fb.array([])
    });
  }

  get employees(): FormArray {
    return this.employeeForm.get('employees') as FormArray;
  }

  addEmployee(): void {
    const employeeGroup = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
    this.employees.push(employeeGroup);
  }

  submitForm() {
    if (this.employeeForm.invalid) {
      return;
    } else {
      console.log(this.employeeForm.value);
    }
  }

  deleteItem(index: number) {
    this.employees.removeAt(index);

  }
}
