import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Company } from '../../../@core/data/company';
import { CompanyService, CompanyDataSource } from '../../../@core/service/companies.service';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {
  message: any;

  companyForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    short_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    active: ['', Validators.required],
  });

  company: Company = new Company();
  editorEnabled = false;
  title = "Create";
  status = "view";

  settings = {
    mode: 'external',
    pager: {
      display: true,
      perPage: 10,
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
            return '<i class="fa fa-eye" title="Active"></i>'
          } else {
            return '<i class="fa fa-eye-slash text-danger" title="Inactive"></i>'
          }
        },
      },
      created_at: {
        title: 'Created',
        type: 'date',
        filter: false,
        valuePrepareFunction: (value) => {
          return new DatePipe('en-US').transform(new Date(value.date), 'dd/MM/yyyy HH:mm:ss');
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

  source: CompanyDataSource;

  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    private fb: FormBuilder) {
      this.source = new CompanyDataSource(http);
      this.source.setPaging(1,this.settings.pager.perPage,true);
  }
  
  ngOnInit(): void {
  }

  newCompany() {
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
      this.company = event.data;
      this.companyForm = this.fb.group({
        id: [this.company.id],
        name: new FormControl(this.company.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        short_name: new FormControl(this.company.short_name, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
        active: new FormControl(this.company.active, Validators.required),
        created_at: [this.company.created_at]
      });
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        const index = event.source.data.indexOf(event.data);
        this.company = event.data;
        this.companyService.deleteCompany(this.company)
        .subscribe(
          data => {
            this.source.remove(this.company);
          }, 
          error => console.log(error));
      }
    } else {
      console.log(event.action);
    }
  }

  onClickCreate(event): void {
    this.editorEnabled = true;
    this.message = "";
    this.title = "Create";
    this.status = "create";
    this.company = new Company();
    this.companyForm = this.fb.group({
      id: [''],
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      short_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      active: new FormControl('', Validators.required),
    });
  }

  onClickBack(): void {
    this.editorEnabled = false;
    this.title = "View";
    this.status = "view";
  }

  onClickRefresh(): void {
    this.source.refresh();
  }

  save() {
    if (this.status == "create" ) {
      this.company = <Company>this.companyForm.value;
      this.companyService.addCompany(this.company)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.source.add(this.company);
            this.company = new Company();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Company name Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
    } else if (this.status == "update") {
      this.company = <Company>this.companyForm.value;
      this.companyService.updateCompany(this.company)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.company = new Company();
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
}
