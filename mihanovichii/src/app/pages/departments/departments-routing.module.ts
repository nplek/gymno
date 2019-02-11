import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsComponent } from './departments.component';
import { DepartmentsTableComponent } from './departments-table/departments-table.component';

const routes: Routes = [{
  path: '',
  component: DepartmentsComponent,
  children: [{
    path: 'departments-table',
    component: DepartmentsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentsRoutingModule { }

export const routedComponents = [
    DepartmentsComponent,
    DepartmentsTableComponent,
];
