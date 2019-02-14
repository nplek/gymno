import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, from } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';
import { UserData } from './data/users';

import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';

const socialLinks = [
  {
    url: 'https://github.com/nplek/',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    target: '_blank',
    icon: 'socicon-google',
  }
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  /*{ provide: ElectricityData, useClass: ElectricityService },
  { provide: SmartTableData, useClass: SmartTableService },
  { provide: UserActivityData, useClass: UserActivityService },
  { provide: OrdersChartData, useClass: OrdersChartService },
  { provide: ProfitChartData, useClass: ProfitChartService },
  { provide: TrafficListData, useClass: TrafficListService },
  { provide: EarningData, useClass: EarningService },
  { provide: OrdersProfitChartData, useClass: OrdersProfitChartService },
  { provide: TrafficBarData, useClass: TrafficBarService },
  { provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: SolarData, useClass: SolarService },
  { provide: TrafficChartData, useClass: TrafficChartService },
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: CountryOrderData, useClass: CountryOrderService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
  { provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService },
  { provide: SecurityCamerasData, useClass: SecurityCamerasService },*/
  
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
