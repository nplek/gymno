import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';

const routes: Routes = [{
  path: '',
  component: EmployeesComponent,
  children: [{
    path: 'employees-table',
    component: EmployeesTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule { }

export const routedComponents = [
    EmployeesComponent,
    EmployeesTableComponent,
];
