import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { CompaniesTableComponent } from './companies-table/companies-table.component';

const routes: Routes = [{
  path: '',
  component: CompaniesComponent,
  children: [{
    path: 'company/:id',
    redirectTo: '/companies-edit/:id'
  },{
    path: 'companies-table',
    component: CompaniesTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule { }

export const routedComponents = [
    CompaniesComponent,
    CompaniesTableComponent,
];
