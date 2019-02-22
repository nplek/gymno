import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Unit } from '../data/unit';
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
export class UnitService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/units';

    constructor(
        private http: HttpClient,
    ){}

    getUnits (): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.dataUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                //return result._embedded.Units;
                return result.data;
            }));
    }

    getActiveUnits (): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.dataUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getUnit(id: number): Observable<Unit> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Unit>(url,httpOptions);
    }

    addUnit(unit: Unit): Observable<Unit> {
        return this.http.post<Unit>(`${this.dataUrl}/`,unit,httpOptions);
    }

    deleteUnit(unit: Unit | number): Observable<Unit> {
        const id = typeof unit === 'number' ? unit : unit.id;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Unit>(url,httpOptions);
    }

    updateUnit(unit: Unit): Observable<any> {
        const url = `${this.dataUrl}/${unit.id}`;
        return this.http.put(url, unit, httpOptions);
    }
}

@Injectable()
export class UnitDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/units';

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
        return this.http.get<Unit[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}