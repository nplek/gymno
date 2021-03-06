import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RolesRoutingModule, routedComponents } from './roles-routing.module';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    ThemeModule,
    RolesRoutingModule,
    Ng2SmartTableModule,
    MultiselectDropdownModule,
  ]
})
export class RolesModule { }
