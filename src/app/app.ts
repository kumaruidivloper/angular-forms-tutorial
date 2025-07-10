import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEdit } from './emp-add-edit/emp-add-edit';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular-Forms-Tutoriall';

  constructor(private _dialog: MatDialog) {}

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEdit);
  }
}
