import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  obtenerRegiones():Observable<Region[]>{
    const url = `${this.baseUrl}/Region/ObtenerRegiones`;
        const params=new HttpParams()
       .set('paisId',11)
    return this.http.get<Region[]>(url, { params });
  }
}
