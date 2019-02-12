import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PagedData } from '../data/page-data';

export class Company {
    comId: number;
    name: string;
    shortName: string;
    active: string;
    createdAt: string;
    updatedAt: string;
}

const httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'accept': 'application/json'
    })
};

@Injectable({
providedIn: 'root'
})
export class CompanyService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/companies';

    constructor(
        private http: HttpClient,
    ){}

    getCompaniesPage(): Observable<PagedData<Company>> {
        return this.http.get<Company[]>(`${this.dataUrl}/`).pipe(
            map((result:any)=>{
               return result;
            }));
    }

    getCompaniesList(): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.dataUrl}/list`).pipe(
            map((result:any)=>{
               return result.data;
            }));
    }

    getCompanies (): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.dataUrl}/`).pipe(
            map((result:any)=>{
               return result.data;
            }));
    }

    getCompany(id: number): Observable<Company> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Company>(url);
    }

    add(company: Company): Observable<Company> {
        return this.http.post<Company>(`${this.dataUrl}/`,company,httpOptions);
    }

    delete(company: Company | number): Observable<Company> {
        const id = typeof company === 'number' ? company : company.comId;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Company>(url,httpOptions);
    }

    update(company: Company): Observable<any> {
        const url = `${this.dataUrl}/${company.comId}`;
        return this.http.put(url, company, httpOptions);
    }
}