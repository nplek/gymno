import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: MyDashboardComponent,
  }, {
    path: 'companies',
    loadChildren: './companies/companies.module#CompaniesModule'
  }, {
    path: 'departments',
    loadChildren: './departments/departments.module#DepartmentsModule'
  }, {
    path: 'employees',
    loadChildren: './employees/employees.module#EmployeesModule',
  }, {
    path: 'positions',
    loadChildren: './positions/positions.module#PositionsModule',
  }, {
    path: 'locations',
    loadChildren: './locations/locations.module#LocationsModule',
  }, {
    path: 'warehouses',
    loadChildren: './warehouses/warehouses.module#WarehousesModule',
  }, {
    path: 'units',
    loadChildren: './units/units.module#UnitsModule',
  }, {
    path: 'items',
    loadChildren: './items/items.module#ItemsModule',
  }, {
    path: 'permissions',
    loadChildren: './permissions/permissions.module#PermissionsModule'
  }, {
    path: 'roles',
    loadChildren: './roles/roles.module#RolesModule'
  }, {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
