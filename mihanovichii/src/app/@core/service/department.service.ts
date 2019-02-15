import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '../data/department';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('gymno_token')
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
        return this.http.get<Department[]>(`${this.dataUrl}/active`).pipe(
            map((result:any)=>{
                return result;
            }));
    }

    getDepartment(id: number): Observable<Department> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Department>(url);
    }

    add(department: Department): Observable<Department> {
        return this.http.post<Department>(`${this.dataUrl}/`,department,httpOptions);
    }

    delete(department: Department | number): Observable<Department> {
        const id = typeof department === 'number' ? department : department.depId;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Department>(url,httpOptions);
    }

    update(department: Department): Observable<any> {
        const url = `${this.dataUrl}/${department.depId}`;
        return this.http.put(url, department, httpOptions);
    }
}
