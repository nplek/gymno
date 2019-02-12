import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../data/role';
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
export class RoleService {
    private apiUrl = environment.apiUrl;
    private roleUrl = this.apiUrl + '/api/roles';

    constructor(
        private http: HttpClient,
    ){}

    getRoles (): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.roleUrl}/`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getRole(id: number): Observable<Role> {
        const url = `${this.roleUrl}/${id}`;
        return this.http.get<Role>(url);
    }

    addRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${this.roleUrl}/`,role,httpOptions);
    }

    deleteRole(role: Role | number): Observable<Role> {
        const id = typeof role === 'number' ? role : role.roleId;
        const url = `${this.roleUrl}/${id}`;

        return this.http.delete<Role>(url,httpOptions);
    }

    updateRole(role: Role): Observable<any> {
        const url = `${this.roleUrl}/${role.roleId}`;
        return this.http.put(url, role, httpOptions);
    }
}
