import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../data/department';
import { environment } from '../../../environments/environment';
import { LocalDataSource } from 'ng2-smart-table';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth_app_token')).value
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/departments';

    constructor(
        private http: HttpClient,
    ){}

    getDepartments (): Observable<Department[]> {
        return this.http.get<Department[]>(`${this.dataUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getActiveDepartments (): Observable<Department[]> {
        return this.http.get<Department[]>(`${this.dataUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getDepartment(id: number): Observable<Department> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Department>(url,httpOptions);
    }

    add(department: Department): Observable<Department> {
        return this.http.post<Department>(`${this.dataUrl}/`,department,httpOptions);
    }

    delete(department: Department | number): Observable<Department> {
        const id = typeof department === 'number' ? department : department.id;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Department>(url,httpOptions);
    }

    update(department: Department): Observable<any> {
        const url = `${this.dataUrl}/${department.id}`;
        return this.http.put(url, department, httpOptions);
    }
}

@Injectable()
export class DepartmentDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/departments';

    constructor(protected http: HttpClient) {
        super();
    }

    lastRequestCount: number = 0;
    count(): number {
        return this.lastRequestCount;
    }

    public getElements(): Promise<any> {
        let url = `${this.dataUrl}/?`;
        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                url += `_sort=${fieldConf.field}&_order=${fieldConf.direction.toUpperCase()}&`;
            });
        }
        
        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            url += `page=${this.pagingConf['page']}&page_size=${this.pagingConf['perPage']}&`;
        }
        
        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                url += `${fieldConf['field']}_like=${fieldConf['search']}&`;
                }
            });
        }
        return this.http.get<Department[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}