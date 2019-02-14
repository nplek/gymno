import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDashboardComponent } from './my-dashboard.component';


const routes: Routes = [{
  path: '',
  component: MyDashboardComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDashboardRoutingModule { }

export const routedComponents = [
    MyDashboardComponent,
];
