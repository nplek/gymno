import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Unit } from '../../../@core/data/unit';
import { UnitService, UnitDataSource } from '../../../@core/service/unit.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-units-table',
  templateUrl: './units-table.component.html',
  styleUrls: ['./units-table.component.scss']
})
export class UnitsTableComponent implements OnInit {
  message: any;
  unitForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    tname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    active: ['', Validators.required],
    deleted_at: ['']
  });

  unit: Unit = new Unit();
  editorEnabled = false;
  isDeleted = false;
  title = "Create";
  status = "view";

  ngOnInit() {
  }

  settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10
    },
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
        type: 'html',
        valuePrepareFunction:(cell,row)=>{
          console.log(row);
        }
      }],
    },
    columns: {
      /*Actions: //or something
      {
        title:'Actions',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
        },
        filter:false       
      },*/
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
            return '<i class="fa fa-eye-slash text-danger" title="Inactive" ></i>'
          }
        },
      },
      created_at: {
        title: 'Created',
        type: 'date',
        filter: false,
        valuePrepareFunction: (value) => {
          if (value) {
            return new DatePipe('en-US').transform(new Date(value.date), 'dd/MM/yyyy HH:mm:ss');
          } else {
            return '';
          }
          
        }
      },
      deleted_at: {
        title: 'Deleted',
        type: 'date',
        filter: false,
        valuePrepareFunction: (value) => {
          if (value) {
            return new DatePipe('en-US').transform(new Date(value.date), 'dd/MM/yyyy HH:mm:ss');
          } else {
            return '';
          }
          
        }
      }
    },
  };

  source: UnitDataSource;

  constructor(private service: UnitService,
    private http: HttpClient,
    private fb :FormBuilder) {
      this.source = new UnitDataSource(http);
      this.source.setPaging(1,this.settings.pager.perPage,true);
  }

  onCustom(event): void {
    this.message = "";
    this.isDeleted = false;
    if (event.action == "view" ) {
      var data = event.data;
      this.status = "view";
    } else if (event.action == "edit" ) {
      this.editorEnabled = true;
      this.title = "Update";
      this.status = "update";
      this.unit = event.data;
      this.isDeleted = event.data.deleted_at;
      this.unitForm = this.fb.group({
        id: [this.unit.id],
        name: [this.unit.name, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
        tname: new FormControl(this.unit.tname, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
        active: new FormControl(this.unit.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.unit = event.data;
        this.service.deleteUnit(this.unit)
        .subscribe(
          data => {
            this.source.remove(this.unit);
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
    this.isDeleted = false;
    this.unitForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      tname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
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
            this.isDeleted = false;
            this.source.refresh();
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
            this.isDeleted = false;
            this.source.refresh();
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
    this.isDeleted = false;
  }

  onClickRefresh(): void {
    this.source.refresh();
  }

  onClickRestore(): void {

  }
}
