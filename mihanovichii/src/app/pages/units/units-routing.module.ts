import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitsComponent } from './units.component';
import { UnitsTableComponent } from './units-table/units-table.component';

const routes: Routes = [{
  path: '',
  component: UnitsComponent,
  children: [{
    path: 'units-table',
    component: UnitsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule { }

export const routedComponents = [
    UnitsComponent,
    UnitsTableComponent,
];
