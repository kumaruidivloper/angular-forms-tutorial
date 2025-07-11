import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEdit } from './emp-add-edit/emp-add-edit';
import { EmployeeService } from './services/employee';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Core } from './core/core';
import { Emp } from './services/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  protected title = 'Angular-Forms-Tutoriall';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource = new MatTableDataSource<Emp>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _empService: EmployeeService,
    private _coreService: Core
  ) {}

  ngOnInit(): void {
      this.getEmployeeList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEdit);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
  this._empService.getEmployeeList().subscribe({
    next: (res: Emp[]) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: (err: any) => {
      console.error('Failed to fetch employee list:', err);
    }
  });
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        //alert('Employee Delete !!!');
        this._coreService.openSanckBar('Employee Delete !!!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    })
  }


  openEditEmpForm(data: Emp) {
    const dialogRef = this._dialog.open(EmpAddEdit, {
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList();
        }
      }
    })
  }

}
