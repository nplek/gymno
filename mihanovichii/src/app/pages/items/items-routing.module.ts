import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items.component';
import { ItemsTableComponent } from './items-table/items-table.component';

const routes: Routes = [{
  path: '',
  component: ItemsComponent,
  children: [{
    path: 'items-table',
    component: ItemsTableComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule { }

export const routedComponents = [
    ItemsComponent,
    ItemsTableComponent,
];
