import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../data/item';
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
export class ItemService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/items';

    constructor(
        private http: HttpClient,
    ){}

    getItems (): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.dataUrl}/`,httpOptions).pipe(
            map((result:any)=>{
                //return result._embedded.Items;
                return result.data;
            }));
    }

    getActiveItems (): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.dataUrl}/active`,httpOptions).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getItem(id: number): Observable<Item> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Item>(url,httpOptions);
    }

    addItem(item: Item): Observable<Item> {
        return this.http.post<Item>(`${this.dataUrl}/`,item,httpOptions);
    }

    deleteItem(item: Item | number): Observable<Item> {
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Item>(url,httpOptions);
    }

    updateItem(item: Item): Observable<any> {
        const url = `${this.dataUrl}/${item.id}`;
        return this.http.put(url, item, httpOptions);
    }
}

@Injectable()
export class ItemDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/items';

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
        return this.http.get<Item[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}