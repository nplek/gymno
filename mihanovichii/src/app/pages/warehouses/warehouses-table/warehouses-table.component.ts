import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Warehouse } from '../../../@core/data/warehouse';
import { WarehouseService } from '../../../@core/service/warehouse.service';

@Component({
  selector: 'ngx-warehouses-table',
  templateUrl: './warehouses-table.component.html',
  styleUrls: ['./warehouses-table.component.scss']
})
export class WarehousesTableComponent implements OnInit {
  message: any;
  warehouseForm = this.fb.group({
    id:[''],
    whs_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    whs_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    active: ['', Validators.required],
  });

  warehouse: Warehouse = new Warehouse();
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
      whs_code: {
        title: 'Warehouse code',
        type: 'string',
      },
      whs_name: {
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

  constructor(private service: WarehouseService,
    private fb :FormBuilder) {
  }

  getData() {
    return this.service.getWarehouses()
            .subscribe(
              warehouses => {
                this.source.load(warehouses);
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
      this.warehouse = event.data;
      this.warehouseForm = this.fb.group({
        id: [this.warehouse.id],
        whs_code: [this.warehouse.whs_code, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        whs_name: new FormControl(this.warehouse.whs_name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        active: new FormControl(this.warehouse.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.warehouse = event.data;
        this.service.deleteWarehouse(this.warehouse)
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
    this.warehouse = new Warehouse();
    this.warehouseForm = this.fb.group({
      id:[''],
      whs_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      whs_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.warehouse = <Warehouse>this.warehouseForm.value;
      this.service.addWarehouse(this.warehouse)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.warehouse = new Warehouse();
            this.getData();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Warehouse code Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.warehouse = <Warehouse>this.warehouseForm.value;
      this.service.updateWarehouse(this.warehouse)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.warehouse = new Warehouse();
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
    this.warehouse = new Warehouse();
    this.message = "";
  }

  onClickRefresh(): void {
    this.getData();
  }

}