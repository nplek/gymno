import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { MyDashboardRoutingModule, routedComponents } from './my-dashboard-routing.module';
@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    MyDashboardRoutingModule
  ]
})
export class MyDashboardModule { }
