import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { EmployeesRoutingModule, routedComponents } from './employees-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    EmployeesRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class EmployeesModule { }
