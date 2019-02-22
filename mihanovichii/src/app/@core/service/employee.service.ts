import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../data/employee';
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
export class EmployeeService {
    private apiUrl = environment.apiUrl;
    private employeeUrl = this.apiUrl + '/api/employees';
    //private employeeUrl = '/employees';

    constructor(
        private http: HttpClient,
    ){}

    getEmployees (): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.employeeUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getManagers (): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.employeeUrl}/manager/list`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getEmployee(id: number): Observable<Employee> {
        const url = `${this.employeeUrl}/${id}`;
        return this.http.get<Employee>(url, httpOptions);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.employeeUrl}/`,employee,httpOptions);
    }

    deleteEmployee(employee: Employee | number): Observable<Employee> {
        const id = typeof employee === 'number' ? employee : employee.id;
        const url = `${this.employeeUrl}/${id}`;

        return this.http.delete<Employee>(url,httpOptions);
    }

    updateEmployee(employee: Employee): Observable<any> {
        const url = `${this.employeeUrl}/${employee.id}`;
        return this.http.put(url, employee, httpOptions);
    }
}

@Injectable()
export class EmployeeDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/employees';

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
        return this.http.get<Employee[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}