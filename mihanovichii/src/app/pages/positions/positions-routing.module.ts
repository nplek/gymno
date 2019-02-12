import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionsComponent } from './positions.component';
import { PositionsTableComponent } from './positions-table/positions-table.component';

const routes: Routes = [{
  path: '',
  component: PositionsComponent,
  children: [{
    path: 'positions-table',
    component: PositionsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionsRoutingModule { }

export const routedComponents = [
    PositionsComponent,
    PositionsTableComponent,
];
