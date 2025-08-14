import { Component } from '@angular/core';

@Component({
  selector: 'app-other-page',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Other Page</mat-card-title>
        <mat-card-subtitle>Navigate away to test form persistence</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <p>This is another page to demonstrate form state persistence.</p>
        <p>When you navigate back to the User Form, any previously entered data should be restored.</p>
        
        <div class="navigation-info">
          <h3>How to test form persistence:</h3>
          <ol>
            <li>Go back to the User Form</li>
            <li>Fill in some fields</li>
            <li>Navigate to this page (without submitting)</li>
            <li>Return to the User Form</li>
            <li>Your data should be automatically restored</li>
          </ol>
        </div>

        <button mat-raised-button color="primary" routerLink="/user-form">
          <mat-icon>arrow_back</mat-icon>
          Back to User Form
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .navigation-info {
      margin: 24px 0;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }

    .navigation-info h3 {
      margin-top: 0;
      color: #424242;
    }

    ol {
      margin: 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 8px;
    }

    button {
      margin-top: 16px;
    }

    button mat-icon {
      margin-right: 8px;
    }
  `],
  standalone: false
})
export class OtherPageComponent { }