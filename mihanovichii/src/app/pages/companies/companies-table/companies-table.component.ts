import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServerDataSource, LocalDataSource } from 'ng2-smart-table';
import { Company, CompanyService } from '../../../@core/service/companies.service';
import { FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'ngx-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {
  message: any;

  companyForm = this.fb.group({
    comId:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    shortName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    active: ['', Validators.required],
  });

  company: Company = new Company();
  editorEnabled = false;
  title = "Create";
  status = "view";

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
      active: {
        title: 'Active',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 'A') {
            //return 'Active';
            return '<i class="fa fa-eye" title="Active"></i>'
          } else {
            //return 'Inactive';
            return '<i class="fa fa-eye-slash" title="Inactive"></i>'
          }
        },
      },
      created_at: {
        title: 'Create date',
        type: 'string',
        filter: false,
        /*valuePrepareFunction: (value) => {
          return new DatePipe('en-US').transform(new Date(value), 'dd/MM/yyyy HH:mm:ss');
        }*/
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getCompany();
  }

  newCompany() {
    this.editorEnabled = false;
  }

  getCompany() {
    return this.companyService.getCompanies()
              .subscribe(
                companies => {
                  this.source.load(companies);
                }
              );
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
      this.company = event.data;
      this.companyForm = this.fb.group({
        comId: [this.company.comId],
        name: new FormControl(this.company.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        shortName: new FormControl(this.company.shortName, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
        active: new FormControl(this.company.active, Validators.required),
        createAt: [this.company.createdAt]
      });
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        //console.log("Delete record ");
        const index = event.source.data.indexOf(event.data);
        this.company = event.data;
        /*this.companyService.delete(this.company)
        .subscribe(
          data => {
            this.getCompany();
          }, 
          error => console.log(error));*/
      }
    }
  }

  onClickCreate(event): void {
    this.editorEnabled = true;
    this.message = "";
    this.title = "Create";
    this.status = "create";
    this.company = new Company();
    this.companyForm = this.fb.group({
      comId: [''],
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      shortName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      active: new FormControl('', Validators.required),
    });
  }

  onClickBack(): void {
    this.editorEnabled = false;
    this.title = "View";
    this.status = "view";
  }

  onClickRefresh(): void {
    this.getCompany();
  }

  save() {
    if (this.status == "create" ) {
      this.company = <Company>this.companyForm.value;
      /*this.companyService.add(this.company)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.getCompany();
            this.company = new Company();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Company name Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });*/
      
      //-->update to tables
    } else if (this.status == "update") {
      this.company = <Company>this.companyForm.value;
      /*this.companyService.update(this.company)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.company = new Company();
            this.getCompany();
          }, 
          error => { 
            this.editorEnabled = true;
            this.message = error.message;
          });*/
    }
  }

  onSubmit() {
    this.save();
  }
}
