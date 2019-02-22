import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersTableComponent } from './users-table/users-table.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [{
    path: 'users-table',
    component: UsersTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }

export const routedComponents = [
    UsersComponent,
    UsersTableComponent,
];
