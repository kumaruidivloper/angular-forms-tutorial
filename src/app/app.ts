import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.html',
  styleUrl: './app.scss',
})
export class App {
  user: { username: string } = { username: '' };

  submitForm(myForm: NgForm) {
    if (myForm.valid) {
      alert('Submitted successfully, check console');
      console.log(this.user);
    }
  }
}
