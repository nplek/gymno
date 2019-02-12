import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

import { EmployeeService } from '../../../@core/service/employee.service';
import { Employee } from '../../../@core/data/employee';
import { PositionService } from '../../../@core/service/position.service';
import { Position } from '../../../@core/data/position';
import { DepartmentService } from '../../../@core/service/department.service';
import { Department } from '../../../@core/data/department';

@Component({
  selector: 'ngx-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  message: any;
  employeeForm = this.fb.group({
    id:[''],
    employee_id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.maxLength(30)]],
    phone: ['', [Validators.maxLength(30)]],
    employeeType: ['', [Validators.required]],
    position: ['', Validators.required],
    department: ['', Validators.required],
    active: ['', Validators.required],
  });

  employee: Employee = new Employee();
  editorEnabled = false;
  title = "Create";
  status = "view";
  positionSelected: Position = new Position();
  positions: Position[];
  departmentSelected: Department = new Department();
  departments: Department[];

  ngOnInit() {
    this.getPositionList();
    this.getDepartmentList();
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
      position: {
        title: 'Position',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (data == null){
            return '';
          } else {
            return data.name;
          }
        }
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
            return '<i class="fa fa-eye-slash" title="Inactive"></i>'
          }
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: EmployeeService,
    private fb: FormBuilder,
    private posService: PositionService,
    private deptService: DepartmentService) {
    
  }

  getData() {
    return this.service.getEmployees()
            .subscribe(
              employees => {
                this.source.load(employees);
              }
            );
  }

  getPositionList() {
    return this.posService.getActivePositions()
            .subscribe(
              positions => {
                this.positions = positions;
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
      this.positionSelected = this.employee.position;
      this.departmentSelected = this.employee.department;
      
      this.employeeForm = this.fb.group({
        id: [this.employee.id],
        employee_id: [this.employee.employee_id, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        first_name: new FormControl(this.employee.first_name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        last_name: new FormControl(this.employee.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        email: new FormControl(this.employee.email, [Validators.required, Validators.email]),
        mobile: new FormControl(this.employee.mobile, [Validators.maxLength(30)]),
        phone: new FormControl(this.employee.phone, [Validators.maxLength(30)]),
        employeeType: new FormControl(this.employee.employeeType, [Validators.required]),
        position: new FormControl(this.employee.position, [Validators.required]),
        department: new FormControl(this.employee.department, [Validators.required]),
        active: new FormControl(this.employee.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        //const index = event.source.data.indexOf(event.data);
        this.employee = event.data;
        this.service.deleteEmployee(this.employee)
        .subscribe(
          data => {
            this.getData();
          }, 
          error => console.log(error));
      }
    }
  }

  onClickCreate(event): void {
    this.editorEnabled = true;
    this.title = "Create";
    this.status = "create";
    this.employee = new Employee();
    this.positionSelected = new Position();
    this.departmentSelected = new Department();
    
    this.employeeForm = this.fb.group({
      id:[''],
      employee_id:['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.maxLength(30)]],
      phone: ['', [Validators.maxLength(30)]],
      employeeType: ['', [Validators.required]],
      position: ['', Validators.required],
      department: ['', Validators.required],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.employee = <Employee>this.employeeForm.value;
      this.service.addEmployee(this.employee)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.employee = new Employee();
            this.positionSelected = new Position();
            this.departmentSelected = new Department();
            this.getData();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Employee Id Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.employee = <Employee>this.employeeForm.value;
      this.service.updateEmployee(this.employee)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.getData();
            this.employee = new Employee();
            this.positionSelected = new Position();
            this.departmentSelected = new Department();
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
    this.employee = new Employee();
    this.positionSelected = new Position();
    this.departmentSelected = new Department();
  }

  onClickRefresh(): void {
    this.getData();
  }
}
