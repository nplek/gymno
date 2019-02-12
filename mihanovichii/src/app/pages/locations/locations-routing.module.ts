import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent } from './locations.component';
import { LocationsTableComponent } from './locations-table/locations-table.component';

const routes: Routes = [{
  path: '',
  component: LocationsComponent,
  children: [{
    path: 'locations-table',
    component: LocationsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule { }

export const routedComponents = [
    LocationsComponent,
    LocationsTableComponent,
];
