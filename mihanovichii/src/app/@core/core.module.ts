import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthService, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
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
];

export class NbSimpleRoleProvider extends NbRoleProvider {

  getRole() {
    // here you could provide any role based on any auth flow
    console.log('NbSimpleRoleProvider.getRole()');
    //return observableOf('admin');
    return observableOf(['guest', 'user', 'editor']);
  }
}

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      /*NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),*/
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '',
        login: {
          endpoint: 'http://localhost:8000/api/auth/login',
          method: 'post',
        },
        logout: {
          endpoint: 'http://localhost:8000/api/auth/logout',
          method: 'get'
        }
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
        redirectDelay: 0,
        showMessages: {
          success: true,
        },
        defaultErrors: ['Login/Email combination is not correct, please try again.'],
        defaultMessages: ['You have been successfully logged in.'],
      },
      /*register: {
        socialLinks: socialLinks,
      },*/
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        //view: '*',
        view: ['email']
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
      admin: {
        parent: 'user',
        view: ['company','department'],
        create: ['company','department'],
        edit: ['company','department'],
        remove: ['company','department']
      }
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
