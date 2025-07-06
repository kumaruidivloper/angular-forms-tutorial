import { Component } from '@angular/core';
import { registerFormConfig } from './constants/register-form.contant';
import { IForm } from './interface/form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-test-app';
  protected registerForm = registerFormConfig as IForm;
}
