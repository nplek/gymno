import { Component } from '@angular/core';

import { MENU_ITEMS,ADMIN_MENU_ITEMS,USER_MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  //menu = MENU_ITEMS;
  //menu = USER_MENU_ITEMS.concat(MENU_ITEMS);
  menu = ADMIN_MENU_ITEMS.concat(USER_MENU_ITEMS).concat(MENU_ITEMS);
}
