import { Routes } from '@angular/router';
import { FormGuard } from './core/gaurds/form.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/user-form',
    pathMatch: 'full'
  },
  {
    path: 'user-form',
    loadChildren: () => import('./features/user-form/user-form.module').then(m => m.UserFormModule),
    canDeactivate: [FormGuard]
  },
  {
    path: 'other-page',
    loadChildren: () => import('./features/user-form/other-page/other-page.module').then(m => m.OtherPageModule)
  },
  {
    path: '**',
    redirectTo: '/user-form'
  }
];