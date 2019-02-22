import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Warehouse } from '../data/warehouse';
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
export class WarehouseService {
    private apiUrl = environment.apiUrl;
    private warehouseUrl = this.apiUrl + '/api/whs';

    constructor(
        private http: HttpClient,
    ){}

    getWarehouses (): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(`${this.warehouseUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                //return result._embedded.Warehouses;
                return result.data;
            }));
    }

    getActiveWarehouses (): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(`${this.warehouseUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getWarehouse(id: number): Observable<Warehouse> {
        const url = `${this.warehouseUrl}/${id}`;
        return this.http.get<Warehouse>(url,httpOptions);
    }

    addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
        return this.http.post<Warehouse>(`${this.warehouseUrl}/`,warehouse,httpOptions);
    }

    deleteWarehouse(warehouse: Warehouse | number): Observable<Warehouse> {
        const id = typeof warehouse === 'number' ? warehouse : warehouse.id;
        const url = `${this.warehouseUrl}/${id}`;

        return this.http.delete<Warehouse>(url,httpOptions);
    }

    updateWarehouse(warehouse: Warehouse): Observable<any> {
        const url = `${this.warehouseUrl}/${warehouse.id}`;
        return this.http.put(url, warehouse, httpOptions);
    }
}

@Injectable()
export class WarehouseDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/whs';

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
        return this.http.get<Warehouse[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}
