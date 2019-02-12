import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-items',
  template: `<router-outlet></router-outlet>`,
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
