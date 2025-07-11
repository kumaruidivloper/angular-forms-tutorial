import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Core {

  constructor(private _snackBar: MatSnackBar) {}

  openSanckBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
  
}
