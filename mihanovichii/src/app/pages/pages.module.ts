import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MyDashboardModule } from './my-dashboard/my-dashboard.module';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
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
