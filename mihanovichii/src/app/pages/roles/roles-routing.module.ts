import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesComponent } from './roles.component';
import { RolesTableComponent } from './roles-table/roles-table.component';

const routes: Routes = [{
  path: '',
  component: RolesComponent,
  children: [{
    path: 'roles-table',
    component: RolesTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule { }

export const routedComponents = [
    RolesComponent,
    RolesTableComponent,
];
