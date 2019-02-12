import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Unit } from '../../../@core/data/unit';
import { UnitService } from '../../../@core/service/unit.service';

@Component({
  selector: 'ngx-units-table',
  templateUrl: './units-table.component.html',
  styleUrls: ['./units-table.component.scss']
})
export class UnitsTableComponent implements OnInit {
  message: any;
  unitForm = this.fb.group({
    id:[''],
    whs_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    whs_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    active: ['', Validators.required],
  });

  unit: Unit = new Unit();
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
      name: {
        title: 'Unit name',
        type: 'string',
      },
      tname: {
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

  constructor(private service: UnitService,
    private fb :FormBuilder) {
  }

  getData() {
    return this.service.getUnits()
            .subscribe(
              units => {
                this.source.load(units);
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
      this.unit = event.data;
      this.unitForm = this.fb.group({
        id: [this.unit.id],
        name: [this.unit.name, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        tname: new FormControl(this.unit.tname, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        active: new FormControl(this.unit.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.unit = event.data;
        this.service.deleteUnit(this.unit)
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
    this.unit = new Unit();
    this.unitForm = this.fb.group({
      id:[''],
      whs_code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      whs_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.unit = <Unit>this.unitForm.value;
      this.service.addUnit(this.unit)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.unit = new Unit();
            this.getData();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Unit name confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.unit = <Unit>this.unitForm.value;
      this.service.updateUnit(this.unit)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.unit = new Unit();
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
    this.unit = new Unit();
    this.message = "";
  }

  onClickRefresh(): void {
    this.getData();
  }

}
