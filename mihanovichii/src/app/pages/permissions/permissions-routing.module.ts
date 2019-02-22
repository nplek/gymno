import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsComponent } from './permissions.component';
import { PermissionsTableComponent } from './permissions-table/permissions-table.component';

const routes: Routes = [{
  path: '',
  component: PermissionsComponent,
  children: [{
    path: 'permissions-table',
    component: PermissionsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsRoutingModule { }

export const routedComponents = [
    PermissionsComponent,
    PermissionsTableComponent,
];
