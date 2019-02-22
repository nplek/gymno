import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../data/user';
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
export class UserService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/users';

    constructor(
        private http: HttpClient,
    ){}

    getUsers (): Observable<User[]> {
        return this.http.get<User[]>(`${this.dataUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                //return result._embedded.Units;
                return result.data;
            }));
    }

    getActiveUsers (): Observable<User[]> {
        return this.http.get<User[]>(`${this.dataUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getUser(id: number): Observable<User> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<User>(url,httpOptions);
    }

    addUser(unit: User): Observable<User> {
        return this.http.post<User>(`${this.dataUrl}/`,unit,httpOptions);
    }

    deleteUser(unit: User | number): Observable<User> {
        const id = typeof unit === 'number' ? unit : unit.id;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<User>(url,httpOptions);
    }

    updateUser(user: User): Observable<any> {
        const url = `${this.dataUrl}/${user.id}`;
        return this.http.put(url, user, httpOptions);
    }
}

@Injectable()
export class UserDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/users';

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
        return this.http.get<User[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}