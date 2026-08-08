import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ComunaBase } from '../interfaces/comuna';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComunaService {
  
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }
    
    obtenerComunas(regionId: number): Observable<ComunaBase[]> {
        const url = `${this.baseUrl}/Comuna/obtenerComunasBase`;
        const params=new HttpParams()
       .set('regionId',regionId)
        return this.http.get<ComunaBase[]>(url, {params});
    }
}
