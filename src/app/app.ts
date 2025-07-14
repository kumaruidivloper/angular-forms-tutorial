import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <form class="form-container" #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="user"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="email"
          autocomplete="off"
          required
        />
      </div>
      <div>
        <label for="country">Country:</label>
        <select name="select" id="country" [(ngModel)]="selectedCountry">
          <option *ngFor="let country of countries" [value]="country.value">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="city">City:</label>
        <select name="city" id="city" [(ngModel)]="city">
          <option
            *ngFor="let city of getCitiesByCountry(selectedCountry)"
            [value]="city"
          >
            {{ city }}
          </option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  styleUrl: './app.scss',
})
export class App {
  user: string = '';
  email: string = '';
  selectedCountry: string = '';
  city: string = '';

  countries = [
    { name: 'USA', value: 'usa' },
    { name: 'Australia', value: 'aus' },
    { name: 'UK', value: 'uk' },
  ];

  cities: { [key: string]: string[] } = {
    usa: ['New York', 'Los Angeles', 'Chicago'],
    aus: ['Sydney', 'Melbourne', 'Brisbane'],
    uk: ['London', 'Manchester', 'Birmingham'],
  };

  getCitiesByCountry(country: string): string[] {
    return this.cities[country] || [];
  }

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const formData = {
        user: this.user,
        email: this.email,
        country: this.selectedCountry,
        city: this.city,
      };
      console.log('Form Submitted', formData);
    } else {
      alert('Please fill up the fields');
    }
  }
}
