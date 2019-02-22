import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../data/permission';
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
export class PermissionService {
    private apiUrl = environment.apiUrl;
    private permissionUrl = this.apiUrl + '/api/permissions';

    constructor(
        private http: HttpClient,
    ){}

    getPermissions (): Observable<Permission[]> {
        return this.http.get<Permission[]>(`${this.permissionUrl}/`, httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getPermission(id: number): Observable<Permission> {
        const url = `${this.permissionUrl}/${id}`;
        return this.http.get<Permission>(url, httpOptions);
    }

    addPermission(permission: Permission): Observable<Permission> {
        return this.http.post<Permission>(`${this.permissionUrl}/`,permission,httpOptions);
    }

    deletePermission(permission: Permission | number): Observable<Permission> {
        const id = typeof permission === 'number' ? permission : permission.id;
        const url = `${this.permissionUrl}/${id}`;

        return this.http.delete<Permission>(url,httpOptions);
    }

    updatePermission(permission: Permission): Observable<any> {
        const url = `${this.permissionUrl}/${permission.id}`;
        return this.http.put(url, permission, httpOptions);
    }
}

@Injectable()
export class PermissionDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/permissions';

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
        return this.http.get<Permission[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}