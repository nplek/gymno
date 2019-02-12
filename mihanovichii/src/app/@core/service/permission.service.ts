import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../data/permission';
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
export class PermissionService {
    private apiUrl = environment.apiUrl;
    private permissionUrl = this.apiUrl + '/api/permissions';

    constructor(
        private http: HttpClient,
    ){}

    getPermissions (): Observable<Permission[]> {
        return this.http.get<Permission[]>(`${this.permissionUrl}/`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getPermission(id: number): Observable<Permission> {
        const url = `${this.permissionUrl}/${id}`;
        return this.http.get<Permission>(url);
    }

    addPermission(permission: Permission): Observable<Permission> {
        return this.http.post<Permission>(`${this.permissionUrl}/`,permission,httpOptions);
    }

    deletePermission(permission: Permission | number): Observable<Permission> {
        const id = typeof permission === 'number' ? permission : permission.permissionId;
        const url = `${this.permissionUrl}/${id}`;

        return this.http.delete<Permission>(url,httpOptions);
    }

    updatePermission(permission: Permission): Observable<any> {
        const url = `${this.permissionUrl}/${permission.permissionId}`;
        return this.http.put(url, permission, httpOptions);
    }
}
