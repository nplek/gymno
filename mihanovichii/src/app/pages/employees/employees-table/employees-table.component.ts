import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { EmployeeService, EmployeeDataSource } from '../../../@core/service/employee.service';
import { Employee } from '../../../@core/data/employee';
import { PositionService } from '../../../@core/service/position.service';
import { Position } from '../../../@core/data/position';
import { DepartmentService } from '../../../@core/service/department.service';
import { Department } from '../../../@core/data/department';
import { HttpClient } from '@angular/common/http';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'ngx-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

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
  employeeForm = this.fb.group({
    id:[''],
    employee_id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.maxLength(30)]],
    phone: ['', [Validators.maxLength(30)]],
    type: ['', [Validators.required]],
    positions: ['', Validators.required],
    department: ['', Validators.required],
    manager: ['', Validators.required],
    active: ['', Validators.required],
    optionsModel:[''],
  });

  employee: Employee = new Employee();
  editorEnabled = false;
  title = "Create";
  status = "view";
  //positionSelected: Position[] = [];// = new Position();
  positions: number[] = [];
  positionList: Position[];

  managerSelected: Employee = new Employee();
  managers: Employee[];

  departmentSelected: Department = new Department();
  departments: Department[];

  onChange() {
    console.log('onChange => ' + this.positions);
  }

  ngOnInit() {
    this.getPositionList();
    this.getManagerList();
    this.getDepartmentList();
  }

  settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 20,
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
      }]
    },
    columns: {
      employee_id: {
        title: 'Employee ID',
        type: 'string'
      },
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      department: {
        title: 'Department',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (data == null) {
            return '';
          } else {
            return data.name;
          }
          
        },
      },
      positions: {
        title: 'Position',
        type: 'string',
        valuePrepareFunction: (values) => {
          var results = [];
          for(let index in values){
            results.push(values[index].name);
          }
          return results;
        }
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
        valuePrepareFunction: (data) => {
          var num = data.slice(0, 3) + '-' + data.slice(3,6) + '-' + data.slice(6);
          return num;
        }
      },
      active: {
        title: 'Active',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 'A') {
            return '<i class="fa fa-eye" title="Active"></i>'
          } else {
            return '<i class="fa fa-eye-slash text-danger" title="Inactive"></i>'
          }
        },
      },
    },
  };

  source: EmployeeDataSource;

  constructor(private service: EmployeeService,
    private fb: FormBuilder,
    private http: HttpClient,
    private posService: PositionService,
    private deptService: DepartmentService) {
      this.source = new EmployeeDataSource(http);
      this.source.setPaging(1,this.settings.pager.perPage,true);
  }

  getManagerList() {
    return this.service.getManagers()
    .subscribe(
      managers => {
        this.managers = managers;
      }
    );
  }

  getPositionList() {
    return this.posService.getActivePositions()
    .subscribe(
      positions => {
        this.positionList = positions;
        this.myOptions = positions;
      }
    );
  }

  getDepartmentList() {
    return this.deptService.getActiveDepartments()
    .subscribe(
      departments => {
        this.departments = departments;
      }
    );
  }

  onCustom(event): void {
    if (event.action == "view" ) {
      var data = event.data;
      this.status = "view";
    } else if (event.action == "edit" ) {
      this.editorEnabled = true;
      this.title = "Update";
      this.status = "update";
      this.employee = event.data;
      var positionSelected = this.employee.positions;
      this.departmentSelected = this.employee.department;
      this.managerSelected = this.employee.manager;
      this.positions = [];
      for (let i = 0; i < positionSelected.length; i++) {
        data = positionSelected[i].id
        this.positions.push(data);
      }
      
      this.employeeForm = this.fb.group({
        id: [this.employee.id],
        employee_id: [this.employee.employee_id, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        first_name: new FormControl(this.employee.first_name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        last_name: new FormControl(this.employee.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        email: new FormControl(this.employee.email, [Validators.required, Validators.email]),
        mobile: new FormControl(this.employee.mobile, [Validators.maxLength(30)]),
        phone: new FormControl(this.employee.phone, [Validators.maxLength(30)]),
        positions: new FormControl(this.positions, [Validators.required]),
        department: new FormControl(this.employee.department, [Validators.required]),
        type: new FormControl(this.employee.type,[Validators.required]),
        manager: new FormControl(this.employee.manager, [Validators.required]),
        active: new FormControl(this.employee.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        //const index = event.source.data.indexOf(event.data);
        this.employee = event.data;
        this.service.deleteEmployee(this.employee)
        .subscribe
        (
          data => {
            this.source.remove(this.employee);
          }, 
          error => {
            window.alert(error);
          }
        );
      }
    }
  }

  onClickCreate(event): void {
    this.editorEnabled = true;
    this.title = "Create";
    this.status = "create";
    this.employee = new Employee();
    this.departmentSelected = new Department();
    this.positions = [];
    this.employeeForm = this.fb.group({
      id:[''],
      employee_id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.maxLength(30)]],
      phone: ['', [Validators.maxLength(30)]],
      type: ['', [Validators.required]],
      positions: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.employee = <Employee>this.employeeForm.value;
      this.employee.department_id = this.employee.department.id;
      this.employee.manager_id = this.employee.manager.id;
      this.service.addEmployee(this.employee)
        .subscribe(
          data => {
            this.message = '';
            this.editorEnabled = false;
            this.employee = new Employee();
            this.departmentSelected = new Department();
            this.managerSelected = new Employee();
            this.positions = [];
            this.source.refresh();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Employee Id Confilict";
            } else if (error.status == 422) {
              this.message = "Employee Id Confilict";
            }else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.employee = <Employee>this.employeeForm.value;
      this.employee.department_id = this.employee.department.id;
      this.employee.manager_id = this.employee.manager.id;
      this.service.updateEmployee(this.employee)
        .subscribe(
          data => {
            this.message = '';
            this.editorEnabled = false;
            this.source.refresh();
            this.employee = new Employee();
            this.departmentSelected = new Department();
            this.managerSelected = new Employee();
            this.positions = [];
          }, 
          error => {
            if (error.status == 409){
              this.message = "Employee Id Confilict";
            } else if (error.status == 422) {
              this.message = "Employee Id Confilict";
            }else {
              this.message = error.message;
            }
            this.editorEnabled = true;
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
    this.employee = new Employee();
    this.departmentSelected = new Department();
    this.managerSelected = new Employee();
    this.positions = [];
  }

  onClickRefresh(): void {
    this.source.refresh();
  }
}
