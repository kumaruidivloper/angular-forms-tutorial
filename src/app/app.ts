import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'angular-test-app';
  form!: FormGroup;
  showForm: boolean = true;

  constructor(private fb: FormBuilder) {}
   ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      city: [''],
      contacts: this.fb.array([
        this.fb.group({
          number: [''],
          type: [''],
          description: ['']
        }),
      ]),
    });
  }

  get contacts() {
    return this.form.get('contacts') as FormArray
  }

  addContact() {
    this.contacts.push(
      this.fb.group({
          number: [''],
          type: [''],
          description: ['']
        })
    )
  }

  deleteContacts(index: number) {
    this.contacts.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
    alert(JSON.stringify(this.form.value, null, 2))
  }

}