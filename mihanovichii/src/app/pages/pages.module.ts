import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
//import { DashboardModule } from './dashboard/dashboard.module';
//import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
//import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MyDashboardModule } from './my-dashboard/my-dashboard.module';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    //DashboardModule,
    //ECommerceModule,
    MiscellaneousModule,
    MyDashboardModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    //MyDashboardComponent,
  ],
})
export class PagesModule {
}
