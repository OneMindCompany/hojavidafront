import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EstadoCivil } from '../interfaces/estado-civil';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerEstadosCiviles():Observable<EstadoCivil[]>{
    const url = `${this.baseUrl}/EstadoCivil/obtenerEstadosCiviles`;
    return this.http.get<EstadoCivil[]>(url);
  }
}