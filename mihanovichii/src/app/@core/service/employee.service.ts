import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../data/employee';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json',
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
        return this.http.get<Employee[]>(`${this.employeeUrl}/`).pipe(
            map((result:any)=>{
                //return result._embedded.employees;
                return result.data;
            }));
    }

    getEmployee(id: number): Observable<Employee> {
        const url = `${this.employeeUrl}/${id}`;
        return this.http.get<Employee>(url);
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
