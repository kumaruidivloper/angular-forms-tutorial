import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OtherPageComponent } from './components/other-page.component';

const routes: Routes = [
  {
    path: '',
    component: OtherPageComponent
  }
];

@NgModule({
  declarations: [
    OtherPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class OtherPageModule { }