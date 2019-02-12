import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../data/location';
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
export class LocationService {
    private apiUrl = environment.apiUrl;
    private locationUrl = this.apiUrl + '/api/locations';

    constructor(
        private http: HttpClient,
    ){}

    getLocations (): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.locationUrl}/`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getActiveLocations (): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.locationUrl}/active`).pipe(
            map((result:any)=>{
                return result.data;
            }));
    }

    getLocation(id: number): Observable<Location> {
        const url = `${this.locationUrl}/${id}`;
        return this.http.get<Location>(url);
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
