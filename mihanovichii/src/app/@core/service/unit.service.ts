import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Unit } from '../data/unit';
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
export class UnitService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/units';

    constructor(
        private http: HttpClient,
    ){}

    getUnits (): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.dataUrl}/`).pipe(
            map((result:any)=>{
                //return result._embedded.Units;
                return result.data;
            }));
    }

    getActiveUnits (): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.dataUrl}/active`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getUnit(id: number): Observable<Unit> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Unit>(url);
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
