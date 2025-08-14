import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './components/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserFormComponent
  }
];

@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UserFormModule { }