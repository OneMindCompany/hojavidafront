import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NivelEducacional } from '../interfaces/nivel-educacional';

@Injectable({
  providedIn: 'root'
})
export class NivelEducacionalService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerNivelesEducacionales():Observable<NivelEducacional[]>{
    const url = `${this.baseUrl}/NivelEducacional/obtenerNivelesEducacionales`;
    return this.http.get<NivelEducacional[]>(url);
  }
}
