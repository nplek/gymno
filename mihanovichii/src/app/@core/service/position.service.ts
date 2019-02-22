import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Position } from '../data/position';
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
export class PositionService {
    private apiUrl = environment.apiUrl;
    private positionUrl = this.apiUrl + '/api/positions';
    //private positionUrl = '/positions';

    constructor(
        private http: HttpClient,
    ){}

    getPositions (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                //return result._embedded.positions;
                return result.data;
            }));
    }

    getActivePositions (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/list`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getManagers (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/managers`, httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getPosition(id: number): Observable<Position> {
        const url = `${this.positionUrl}/${id}`;
        return this.http.get<Position>(url, httpOptions);
    }

    addPosition(position: Position): Observable<Position> {
        return this.http.post<Position>(`${this.positionUrl}/`,position,httpOptions);
    }

    deletePosition(position: Position | number): Observable<Position> {
        const id = typeof position === 'number' ? position : position.id;
        const url = `${this.positionUrl}/${id}`;

        return this.http.delete<Position>(url,httpOptions);
    }

    updatePosition(position: Position): Observable<any> {
        const url = `${this.positionUrl}/${position.id}`;
        return this.http.put(url, position, httpOptions);
    }
}

@Injectable()
export class PositionDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/positions';

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
        return this.http.get<Position[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}