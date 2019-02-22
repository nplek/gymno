import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule, routedComponents } from './users-routing.module';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
    UsersRoutingModule,
    MultiselectDropdownModule,
  ]
})
export class UsersModule { }
