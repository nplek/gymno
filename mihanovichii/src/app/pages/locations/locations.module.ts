import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { LocationsRoutingModule, routedComponents } from './locations-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    LocationsRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class LocationsModule { }
