import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TenenciaDeVivienda } from '../interfaces/tenencia-de-vivienda';

@Injectable({
  providedIn: 'root'
})
export class TenenciaDeViviendaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerTenenciasDeVivienda():Observable<TenenciaDeVivienda[]>{
    const url = `${this.baseUrl}/TenenciaDeVivienda/obtenerTenenciasDeVivienda`;
    return this.http.get<TenenciaDeVivienda[]>(url);
  }
}
