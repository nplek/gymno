import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { PositionsRoutingModule, routedComponents } from './positions-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    PositionsRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class PositionsModule { }
