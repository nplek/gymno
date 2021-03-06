import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Role } from '../../../@core/data/role';
import { RoleService, RoleDataSource } from '../../../@core/service/role.service';
import { Permission } from '../../../@core/data/permission';
import { PermissionService } from '../../../@core/service/permission.service';
import { HttpClient } from '@angular/common/http';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'ngx-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit {
  /**  -------------- */
  myOptions: IMultiSelectOption[];
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-warning',
    containerClasses: 'form-control',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };
  
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Select',
    allSelected: 'All selected',
};
  
/** -------------------- */

  message: any;
  roleForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    display_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(100)]],
    permissions:[''],
  });

  permissions: Permission[];
  permissionList: Permission[];

  role: Role = new Role();
  editorEnabled = false;
  isDeleted = false;
  title = "Create";
  status = "view";

  ngOnInit() {
    this.getPermissionList();
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
      permissions: {
        title: 'Permissions',
        type: 'string',
        valuePrepareFunction: (values) => {
          var results = [];
          for(let index in values){
            results.push(values[index].name);
          }
          return results;
        }
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

  source: RoleDataSource;

  constructor(private service: RoleService,
    private permissionService: PermissionService,
    private http: HttpClient,
    private fb :FormBuilder) {
      this.source = new RoleDataSource(http);
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
      this.role = event.data;
      var permissionSelected = this.role.permissions;
      this.permissions = [];
      for (let i = 0; i < permissionSelected.length; i++) {
        data = permissionSelected[i].id
        this.permissions.push(data);
      }

      this.roleForm = this.fb.group({
        id: [this.role.id],
        name: [this.role.name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        display_name: new FormControl(this.role.display_name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        description: new FormControl(this.role.description, [Validators.maxLength(100)]),
        permissions: new FormControl(this.permissions)
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.role = event.data;
        this.service.deleteRole(this.role)
        .subscribe(
          data => {
            this.source.remove(this.role);
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
    this.role = new Role();
    this.isDeleted = false;
    this.roleForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      display_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(100)]],
      permissions: ['']
    });
  }

  save() {
    if (this.status == "create" ) {
      this.role = <Role>this.roleForm.value;
      this.service.addRole(this.role)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.role = new Role();
            this.permissions = [];
            this.isDeleted = false;
            this.source.refresh();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Role name confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.role = <Role>this.roleForm.value;
      this.service.updateRole(this.role)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.role = new Role();
            this.permissions = [];
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
    this.role = new Role();
    this.permissions = [];
    this.message = "";
    this.isDeleted = false;
  }

  onClickRefresh(): void {
    this.source.refresh();
  }

  getPermissionList() {
    return this.permissionService.getPermissions()
    .subscribe(
      permissions => {
        this.permissionList = permissions;
      }
    );
  }

}
