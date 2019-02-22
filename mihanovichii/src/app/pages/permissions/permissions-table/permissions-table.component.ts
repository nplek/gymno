import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Permission } from '../../../@core/data/permission';
import { PermissionService, PermissionDataSource } from '../../../@core/service/permission.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-permissions-table',
  templateUrl: './permissions-table.component.html',
  styleUrls: ['./permissions-table.component.scss']
})
export class PermissionsTableComponent implements OnInit {

  message: any;
  permissionForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    display_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(100)]],
  });

  permission: Permission = new Permission();
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
      name: {
        title: 'Name',
        type: 'string',
      },
      display_name: {
        title: 'Display',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string'
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
      updated_at: {
        title: 'Updated',
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

  source: PermissionDataSource;

  constructor(private service: PermissionService,
    private http: HttpClient,
    private fb :FormBuilder) {
      this.source = new PermissionDataSource(http);
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
      this.permission = event.data;
      this.isDeleted = event.data.deleted_at;
      this.permissionForm = this.fb.group({
        id: [this.permission.id],
        name: [this.permission.name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        display_name: new FormControl(this.permission.display_name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        description: new FormControl(this.permission.description, [Validators.maxLength(100)]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.permission = event.data;
        this.service.deletePermission(this.permission)
        .subscribe(
          data => {
            this.source.remove(this.permission);
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
    this.permission = new Permission();
    this.isDeleted = false;
    this.permissionForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      display_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(100)]],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.permission = <Permission>this.permissionForm.value;
      this.service.addPermission(this.permission)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.permission = new Permission();
            this.isDeleted = false;
            this.source.refresh();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Permission name confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.permission = <Permission>this.permissionForm.value;
      this.service.updatePermission(this.permission)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.permission = new Permission();
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
    this.permission = new Permission();
    this.message = "";
    this.isDeleted = false;
  }

  onClickRefresh(): void {
    this.source.refresh();
  }
}
