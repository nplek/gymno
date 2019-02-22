import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
//import { LocalDataSource } from 'ng2-smart-table';

import { PositionService, PositionDataSource } from '../../../@core/service/position.service';
import { Position } from '../../../@core/data/position';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.scss']
})
export class PositionsTableComponent implements OnInit {
  message: any;
  positionForm = this.fb.group({
    id:[''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    short_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
    active: ['', Validators.required],
  });

  position: Position = new Position();
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
        },
      },
      created_at: {
        title: 'Create date',
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

  source: PositionDataSource;

  constructor(private service: PositionService,
    private http: HttpClient,
    private fb: FormBuilder) {
      this.source = new PositionDataSource(http);
      this.source.setPaging(1,this.settings.pager.perPage,true);
  }


  newPosition() {
    this.editorEnabled = false;
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
      this.position = event.data;
      this.positionForm = this.fb.group({
        id: [this.position.id],
        name: new FormControl(this.position.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        short_name: new FormControl(this.position.short_name, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        active: new FormControl(this.position.active, [Validators.required]),
        createAt: [this.position.created_at],
      });
      
    } else if (event.action == "delete" ) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.position = event.data;
        this.service.deletePosition(this.position)
        .subscribe(
          data => {
            this.source.remove(this.position);
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
    this.position = new Position();
    this.positionForm = this.fb.group({
      id: [''],
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      short_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      active: new FormControl('', Validators.required),
    });
  }

  save() {
    if (this.status == "create" ) {
      this.position = <Position>this.positionForm.value;
      this.service.addPosition(this.position)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.position = new Position();
            this.source.refresh();
          }, 
          error => {
            if (error.status == 409){
              this.message = "Position name Confilict";
            } else {
              this.message = error.message;
            }
            this.editorEnabled = true;
          });
      
      //-->update to tables
    } else if (this.status == "update") {
      this.position = <Position>this.positionForm.value;
      this.service.updatePosition(this.position)
        .subscribe(
          data => {
            this.editorEnabled = false;
            this.position = new Position();
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
    this.position = new Position();
    this.message = "";
  }

  onClickRefresh(): void {
    this.source.refresh();
  }
}
