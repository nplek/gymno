import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Position } from '../data/position';
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
export class PositionService {
    private apiUrl = environment.apiUrl;
    private positionUrl = this.apiUrl + '/api/positions';
    //private positionUrl = '/positions';

    constructor(
        private http: HttpClient,
    ){}

    getPositions (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/`).pipe(
            map((result:any)=>{
                //return result._embedded.positions;
                return result.data;
            }));
    }

    getActivePositions (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/list`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getManagers (): Observable<Position[]> {
        return this.http.get<Position[]>(`${this.positionUrl}/manager`).pipe(
            map((result:any)=>{
                return result;
            }));
    }

    getPosition(id: number): Observable<Position> {
        const url = `${this.positionUrl}/${id}`;
        return this.http.get<Position>(url);
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
