import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss'
})
export class App {
  employeeForm: FormGroup;

  constructor() {
    this.employeeForm = new FormGroup({
      employees: new FormArray([]),
    });
  }

  get employees(): FormArray {
    return this.employeeForm.get('employees') as FormArray;
  }

  addEmployee(): void {
    const employeeGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
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
