import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { Role } from '../../../@core/data/role';
import { RoleService } from '../../../@core/service/role.service';
import { Employee } from '../../../@core/data/employee';
import { EmployeeService } from '../../../@core/service/employee.service';
import { User } from '../../../@core/data/user';
import { UserService, UserDataSource } from '../../../@core/service/user.service';
import { HttpClient } from '@angular/common/http';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'ngx-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

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
  userForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    user_type: ['', [Validators.required]],
    active: ['',[Validators.required]],
    employee: [''],
    employee_id:[''],
    roles:[''],
  });

  roles: Role[];
  roleList: Role[];
  employeeList: Employee[];

  user: User = new User();
  editorEnabled = false;
  isDeleted = false;
  title = "Create";
  status = "view";

  ngOnInit() {
    this.getRoleList();
    this.getEmployeeList();
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
      email: {
        title: 'Email',
        type: 'string',
      },
      user_type: {
        title: 'Type',
        type: 'string'
      },
      roles: {
        title: 'Roles',
        type: 'string',
        valuePrepareFunction: (values) => {
          var results = [];
          for(let index in values){
            results.push(values[index].name);
          }
          return results;
        }
      },
      employee: {
        title: 'Employee',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value) {
            return value.first_name + ' ' + value.last_name;
          } else {
            return '-';
          }
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

  source: UserDataSource;

  constructor(private service: UserService,
    private roleService: RoleService,
    private empService: EmployeeService,
    private http: HttpClient,
    private fb :FormBuilder) {
      this.source = new UserDataSource(http);
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
      this.user = event.data;
      var roleSelected = this.user.roles;
      this.roles = [];
      for (let i = 0; i < roleSelected.length; i++) {
        data = roleSelected[i].id
        this.roles.push(data);
      }

      this.userForm = this.fb.group({
        id: [this.user.id],
        name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        email: new FormControl(this.user.email, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        user_type: new FormControl(this.user.user_type, [Validators.required]),
        employee: new FormControl(this.user.employee, [Validators.required]),
        roles: new FormControl(this.roles)
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.user = event.data;
        this.service.deleteUser(this.user)
        .subscribe(
          data => {
            this.source.remove(this.user);
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
    this.user = new User();
    this.isDeleted = false;
    this.userForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email, Validators.maxLength(100)]],
      user_type: ['', [Validators.required]],
      active: ['',[Validators.required]],
      roles: ['',[Validators.required]]
    });
  }

  save() {
    if (this.status == "create" ) {
      this.user = <User>this.userForm.value;
      this.service.addUser(this.user)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.user = new User();
            this.roles = [];
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
      this.user = <User>this.userForm.value;
      this.service.updateUser(this.user)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.user = new User();
            this.roles = [];
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
    this.user = new User();
    this.roles = [];
    this.message = "";
    this.isDeleted = false;
  }

  onClickRefresh(): void {
    this.source.refresh();
  }

  getRoleList() {
    return this.roleService.getRoles()
    .subscribe(
      roles => {
        this.roleList = roles;
      }
    );
  }

  getEmployeeList() {
    return this.empService.getEmployees()
    .subscribe(
      emps => {
        this.employeeList = emps;
      }
    );
  }
}
