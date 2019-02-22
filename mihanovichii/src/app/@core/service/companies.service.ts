import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Company } from '../data/company';
import { LocalDataSource } from 'ng2-smart-table';

const httpOptions = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth_app_token')).value
    })
};

@Injectable({
providedIn: 'root'
})
export class CompanyService {
    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/companies';

    constructor(protected http: HttpClient) {
    }

    getCompaniesList(): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.dataUrl}/list`,httpOptions).pipe(
            map((result:any)=>{
               return result.data;
            }));
    }

    getCompanies (): Observable<Company[]> {
        return this.http.get<Company[]>(`${this.dataUrl}/`,httpOptions).pipe(
            map((result:any)=>{
               return result.data;
            }));
    }

    getCompany(id: number): Observable<Company> {
        const url = `${this.dataUrl}/${id}`;
        return this.http.get<Company>(url);
    }

    addCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(`${this.dataUrl}/`,company,httpOptions);
    }

    deleteCompany(company: Company | number): Observable<Company> {
        const id = typeof company === 'number' ? company : company.id;
        const url = `${this.dataUrl}/${id}`;

        return this.http.delete<Company>(url,httpOptions);
    }

    updateCompany(company: Company): Observable<any> {
        const url = `${this.dataUrl}/${company.id}`;
        return this.http.put(url, company, httpOptions);
    }
}

@Injectable()
export class CompanyDataSource extends LocalDataSource  {

    private apiUrl = environment.apiUrl;
    private dataUrl = this.apiUrl + '/api/companies';

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
        return this.http.get<Company[]>(url,httpOptions)
        .pipe(
            map((res:any)=> {
                this.lastRequestCount = res.meta.total;
                return res.data;
            })
        ).toPromise();
    }
}