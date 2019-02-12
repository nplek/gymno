import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehousesComponent } from './warehouses.component';
import { WarehousesTableComponent } from './warehouses-table/warehouses-table.component';

const routes: Routes = [{
  path: '',
  component: WarehousesComponent,
  children: [{
    path: 'warehouses-table',
    component: WarehousesTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehousesRoutingModule { }

export const routedComponents = [
    WarehousesComponent,
    WarehousesTableComponent,
];
