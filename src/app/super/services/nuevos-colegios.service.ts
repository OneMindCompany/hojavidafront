import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NuevosColegiosService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  importarData(datos:FormData):Observable<{mensaje:string}>{
    const url=`${this.baseUrl}/Importar/ImportarData`;
    return this.http.post<{mensaje:string}>(url,datos);
  }
}
