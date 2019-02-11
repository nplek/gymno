import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
//import { CommonModule } from '@angular/common';
import { CompaniesRoutingModule, routedComponents } from './companies-routing.module';
//import { CompanyService } from '../../@core/service/companies.service';
@NgModule({
  imports: [
    //CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
    CompaniesRoutingModule,
  ],
  declarations: [...routedComponents],
  providers: [
    //CompanyService
  ],
})
export class CompaniesModule { }
