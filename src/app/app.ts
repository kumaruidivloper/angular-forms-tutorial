import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss',
})
export class App {
  formSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const formValues = JSON.stringify(myForm.value);
      console.log(formValues);
      console.log(
        '%c From submitted successfully',
        'color: green; font-weight: 400; font-size: 15px'
      );
    } else {
      alert('Please fill up the required fields');
    }
  }
  resetValue(myForm: NgForm) {
    myForm.resetForm();
  }
  setDefault(myForm: NgForm) {
    myForm.resetForm({
      name: 'Default Name',
      email: 'defaultId@gmail.com',
    });
  }
}
