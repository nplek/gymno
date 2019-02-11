import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DepartmentsRoutingModule, routedComponents } from './departments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DepartmentsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: []
})

export class DepartmentsModule { }