import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss'
})
export class App {
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
    Validators.pattern('^[a-zA-Z0-9]+$'),
  ]);

  showValue() {
    console.log('Value: ', this.usernameControl.value);
    console.log('Validation Status: ', this.usernameControl.valid);
    console.log(this.usernameControl.errors);
  }
}
