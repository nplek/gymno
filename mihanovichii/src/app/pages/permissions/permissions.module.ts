import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { PermissionsRoutingModule, routedComponents } from './permissions-routing.module';

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
    PermissionsRoutingModule
  ]
})
export class PermissionsModule { }
