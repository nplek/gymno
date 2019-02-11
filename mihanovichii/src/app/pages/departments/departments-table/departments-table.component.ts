import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DepartmentService } from '../../../@core/service/department.service';
import { Department } from '../../../@core/data/department';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { CompanyService } from '../../../@core/service/companies.service';
import { Company } from '../../../@core/data/company';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-departments-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['./departments-table.component.scss']
})
export class DepartmentsTableComponent implements OnInit {

  message: any;

  departmentForm = this.fb.group({
    depId:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    shortName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    company: ['', Validators.required],
    active: ['', Validators.required],
  });

  department: Department = new Department();
  editorEnabled = false;
  title = "Create";
  status = "view";
  companySelected: Company = new Company();

  companies: Company[];

  ngOnInit() {
    this.getCompanyList();
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
        title: 'Name',
        type: 'string',
      },
      short_name: {
        title: 'Short Name',
        type: 'string',
      },
      company: {
        title: 'Company',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data.name;
        },
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
      /*created_at: {
        title: 'Create date',
        type: 'date',
        filter: false,
        valuePrepareFunction: (value) => {
          return new DatePipe('en-US').transform(new Date(value), 'dd/MM/yyyy HH:mm:ss');
        }
      },*/
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: DepartmentService,
    private comService: CompanyService,
    private fb: FormBuilder) {
  }

  getData() {
    return this.service.getDepartments()
            .subscribe(
              departments => {
                this.source.load(departments);
              }
            );
  }

  getCompanyList() {
    return this.comService.getCompaniesList()
            .subscribe(
              companies => {
                this.companies = companies;
              }
            );
  }

  newDepartment() {
    this.editorEnabled = false;
  }

  onCustom(event): void {
    if (event.action == "view" ) {
      var data = event.data;
      this.status = "view";
    } else if (event.action == "edit" ) {
      this.editorEnabled = true;
      this.message = "";
      this.title = "Update";
      this.status = "update";
      this.department = event.data;
      this.companySelected = this.department.company;
      //this.companySelected = this.department.company.comId;
      this.departmentForm = this.fb.group({
        depId: [this.department.depId],
        name: new FormControl(this.department.name, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        shortName: new FormControl(this.department.shortName, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
        company: new FormControl(this.department.company, [Validators.required]),
        active: new FormControl(this.department.active, [Validators.required]),
        createAt: [this.department.createdAt]
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        //console.log("Delete record ");
        const index = event.source.data.indexOf(event.data);
        this.department = event.data;
        this.service.delete(this.department)
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
    this.message = "";
    this.title = "Create";
    this.status = "create";
    this.department = new Department();
    this.companySelected = new Company();
    this.departmentForm = this.fb.group({
      depId: [''],
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      shortName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      company: new FormControl('',Validators.required),
      active: new FormControl('', Validators.required),
    });
  }

  save() {
    if (this.status == "create" ) {
      this.department = <Department>this.departmentForm.value;
      this.service.add(this.department)
        .subscribe(
          data => {
            //this.source.add(data);
            this.editorEnabled = false;
            this.department = new Department();
            this.companySelected = new Company();
            this.getData();
          }, 
          error => {
            console.log(error);
            if (error.status == 409){
              this.message = "Department name Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.department = <Department>this.departmentForm.value;
      this.service.update(this.department)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.companySelected = new Company();
            this.department = new Department();
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
    this.companySelected = new Company();
    this.department = new Department();
  }

  onClickRefresh(): void {
    this.getData();
  }
}
