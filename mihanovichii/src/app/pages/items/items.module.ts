import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ItemsRoutingModule, routedComponents } from './items-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    ItemsRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class ItemsModule { }
