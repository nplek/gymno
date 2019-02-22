import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../data/location';
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
export class LocationService {
    private apiUrl = environment.apiUrl;
    private locationUrl = this.apiUrl + '/api/locations';

    constructor(
        private http: HttpClient,
    ){}

    getLocations (): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.locationUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getActiveLocations (): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.locationUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getLocation(id: number): Observable<Location> {
        const url = `${this.locationUrl}/${id}`;
        return this.http.get<Location>(url,httpOptions);
    }

    addLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(`${this.locationUrl}/`,location,httpOptions);
    }

    deleteLocation(location: Location | number): Observable<Location> {
        const id = typeof location === 'number' ? location : location.id;
        const url = `${this.locationUrl}/${id}`;

        return this.http.delete<Location>(url,httpOptions);
    }

    updateLocation(location: Location): Observable<any> {
        const url = `${this.locationUrl}/${location.id}`;
        return this.http.put(url, location, httpOptions);
    }
}

@Injectable()
export class LocationDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/locations';

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
        return this.http.get<Location[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}