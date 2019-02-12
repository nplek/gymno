import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../data/item';
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
export class ItemService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/items';

    constructor(
        private http: HttpClient,
    ){}

    getItems (): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.dataUrl}/`).pipe(
            map((result:any)=>{
                //return result._embedded.Items;
                return result.data;
            }));
    }

    getActiveItems (): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.dataUrl}/active`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getItem(id: number): Observable<Item> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Item>(url);
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
