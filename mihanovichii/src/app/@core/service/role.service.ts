import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../data/role';
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
export class RoleService {
    private apiUrl = environment.apiUrl;
    private roleUrl = this.apiUrl + '/api/roles';

    constructor(
        private http: HttpClient,
    ){}

    getRoles (): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.roleUrl}/`, httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getRole(id: number): Observable<Role> {
        const url = `${this.roleUrl}/${id}`;
        return this.http.get<Role>(url, httpOptions);
    }

    addRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${this.roleUrl}/`,role,httpOptions);
    }

    deleteRole(role: Role | number): Observable<Role> {
        const id = typeof role === 'number' ? role : role.id;
        const url = `${this.roleUrl}/${id}`;

        return this.http.delete<Role>(url,httpOptions);
    }

    updateRole(role: Role): Observable<any> {
        const url = `${this.roleUrl}/${role.id}`;
        return this.http.put(url, role, httpOptions);
    }
}

@Injectable()
export class RoleDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/roles';

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
        return this.http.get<Role[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}