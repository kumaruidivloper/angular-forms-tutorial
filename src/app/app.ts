import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss'
})
export class App {
  myForm!: FormGroup

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      userDetails: this.fb.group({
        fname: ['', Validators.required],
        // More the one validator we need assign this in array
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      }),
      additionalDetails: this.fb.group({
        // More the one validator we need assign this in array
        mobile: ['', [Validators.required, Validators.maxLength(10)]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      feedback: this.fb.group({
        comments: ['', Validators.maxLength(100)],
      })
    });
  }

  step: any = 1;

  btnPrevious() {
    this.step -= 1;
  }

  btnNext() {
    this.step += 1;
  }

  formSubmit() {
    console.log(this.myForm.value)
  }

}
