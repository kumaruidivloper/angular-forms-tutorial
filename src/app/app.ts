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
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      feedback: this.fb.group({
        comments: ['', [Validators.required, Validators.pattern(/^\d{30}$/)]],
      })
    });
  }

  step: any = 1;

  btnPrevious() {
    this.step -= 1;
  }

  btnNext() {
    const userDetailsGroup = this.myForm.get('userDetails') as FormGroup;
    const additionalDetailsGroup = this.myForm.get('additionalDetails') as FormGroup;
    const feedbackGroup = this.myForm.get('feedback') as FormGroup;
    if (userDetailsGroup.invalid && this.step === 1) {
      return;
    }

    if (additionalDetailsGroup.invalid && this.step === 2) {
      return;
    }

    if (feedbackGroup.invalid && this.step === 3) {
      this.step +=1;
      return;
    }
    if (this.step < 3){
      this.step +=1;
    }
  }

  formSubmit() {
    console.log(this.myForm.value)
  }

  get userDetails() {
    return this.myForm.get('userDetails') as FormGroup;
  }

  get additionalDetails() {
    return this.myForm.get('additionalDetails') as FormGroup;
  }

  get feedbackDetails() {
    return this.myForm.get('feedback') as FormGroup;
  }
}
