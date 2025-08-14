import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Angular Form State Persistence</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/user-form" routerLinkActive="active">User Form</a>
      <a mat-button routerLink="/other-page" routerLinkActive="active">Other Page</a>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `],
  standalone: false
})
export class AppComponent { }