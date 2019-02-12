import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Warehouse } from '../data/warehouse';
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
export class WarehouseService {
    private apiUrl = environment.apiUrl;
    private warehouseUrl = this.apiUrl + '/api/whs';

    constructor(
        private http: HttpClient,
    ){}

    getWarehouses (): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(`${this.warehouseUrl}/`).pipe(
            map((result:any)=>{
                //return result._embedded.Warehouses;
                return result.data;
            }));
    }

    getActiveWarehouses (): Observable<Warehouse[]> {
        return this.http.get<Warehouse[]>(`${this.warehouseUrl}/active`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getWarehouse(id: number): Observable<Warehouse> {
        const url = `${this.warehouseUrl}/${id}`;
        return this.http.get<Warehouse>(url);
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
