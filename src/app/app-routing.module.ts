import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthLoginComponent } from './auth/auth-login.component';

import { AuthGuard } from './auth/auth.gaurd';

const routes: Routes = [
  {path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  {path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: '', component: AuthLoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
