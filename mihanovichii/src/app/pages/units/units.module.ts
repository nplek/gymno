import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UnitsRoutingModule, routedComponents } from './units-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    UnitsRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class UnitsModule { }
