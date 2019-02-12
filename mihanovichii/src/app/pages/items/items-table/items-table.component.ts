import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

import { Item } from '../../../@core/data/item';
import { ItemService } from '../../../@core/service/item.service';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'ngx-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {
  message: any;
  itemForm = this.fb.group({
    id:[''],
    item_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
    unit_name: ['', [Validators.required]],
    active: ['', Validators.required],
  });

  item: Item = new Item();
  editorEnabled = false;
  title = "Create";
  status = "view";

  ngOnInit() {
    this.getData();
  }

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'left',
      custom: [{
        name: 'edit',
        title: '<i class="nb-edit"></i>',
      },{
        name: 'delete',
        title: '<i class="nb-trash"></i>',
      }]
    },
    columns: {
      item_code: {
        title: 'item code',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      active: {
        title: 'Active',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 'A') {
            return '<i class="fa fa-eye" title="Active"></i>'
          } else {
            return '<i class="fa fa-eye-slash" title="Inactive" ></i>'
          }
        },
      },
      /*createdAt: {
        title: 'Create Date',
        type: 'datetime',
        valuePrepareFunction: (value) => {
          return new DatePipe('en-US').transform(new Date(value), 'dd MMM yyyy HH:mm:ss');
        }
      }*/
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ItemService,
    private fb :FormBuilder) {
  }

  getData() {
    return this.service.getItems()
            .subscribe(
              items => {
                this.source.load(items);
              }
            );
  }

  onCustom(event): void {
    this.message = "";
    if (event.action == "view" ) {
      var data = event.data;
      this.status = "view";
    } else if (event.action == "edit" ) {
      this.editorEnabled = true;
      this.title = "Update";
      this.status = "update";
      this.item = event.data;
      this.itemForm = this.fb.group({
        id: [this.item.id],
        item_code: [this.item.name, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        name: new FormControl(this.item.name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        active: new FormControl(this.item.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.item = event.data;
        this.service.deleteItem(this.item)
        .subscribe(
          data => {
            this.getData();
          }, 
          error => {
            this.message = error.message;
          });
      }
    }
  }

  onClickCreate(event): void {
    this.editorEnabled = true;
    this.title = "Create";
    this.status = "create";
    this.item = new Item();
    this.itemForm = this.fb.group({
      id:[''],
      item_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.item = <Item>this.itemForm.value;
      this.service.addItem(this.item)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.item = new Item();
            this.getData();
          }, 
          error => {
            if (error.status == 409){
              this.message = "item code Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.item = <Item>this.itemForm.value;
      this.service.updateItem(this.item)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.item = new Item();
            this.getData();
          }, 
          error => { 
            this.editorEnabled = true;
            this.message = error.message;
          });
    }
    
  }

  onSubmit() {
    this.save();
  }

  onClickBack(): void {
    this.editorEnabled = false;
    this.title = "View";
    this.status = "view";
    this.item = new Item();
    this.message = "";
  }

  onClickRefresh(): void {
    this.getData();
  }
}
