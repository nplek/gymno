import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { WarehousesRoutingModule, routedComponents } from './warehouses-routing.module';
@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    WarehousesRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class WarehousesModule { }
