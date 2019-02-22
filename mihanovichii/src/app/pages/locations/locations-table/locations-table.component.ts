import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { LocalDataSource } from 'ng2-smart-table';

import { Location } from '../../../@core/data/location';
import { LocationService, LocationDataSource } from '../../../@core/service/location.service';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss']
})
export class LocationsTableComponent implements OnInit {
  message: any;
  locationForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
    short_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    active: ['', Validators.required],
  });

  location: Location = new Location();
  editorEnabled = false;
  title = "Create";
  status = "view";

  ngOnInit() {
  }
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
            return '<i class="fa fa-eye-slash text-danger" title="Inactive" ></i>'
          }
        }
      },
      created_at: {
        title: 'Created',
        type: 'date',
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

  source: LocationDataSource;

  constructor(private service: LocationService,
    private http: HttpClient,
    private fb: FormBuilder) {
      this.source = new LocationDataSource(http);
      this.source.setPaging(1,this.settings.pager.perPage,true);
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
      this.location = event.data;
      this.locationForm = this.fb.group({
        id: [this.location.id],
        name: new FormControl(this.location.name, [Validators.required, Validators.minLength(4), Validators.maxLength(120)]),
        short_name: new FormControl(this.location.short_name, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        active: new FormControl(this.location.active, [Validators.required]),
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.location = event.data;
        this.service.deleteLocation(this.location)
        .subscribe(
          data => {
            this.source.remove(this.location);
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
    this.location = new Location();
    this.locationForm = this.fb.group({
      locationId:[''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      short_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      active: ['', Validators.required],
    });
  }

  save() {
    if (this.status == "create" ) {
      this.location = <Location>this.locationForm.value;
      this.service.addLocation(this.location)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.location = new Location();
            this.source.refresh();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Location name Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.location = <Location>this.locationForm.value;
      this.service.updateLocation(this.location)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.location = new Location();
            this.source.refresh();
          }, 
          error => { 
            this.message = error.message;
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
    this.location = new Location();
    this.message = "";
  }

  onClickRefresh(): void {
    this.source.refresh();
  }
}
