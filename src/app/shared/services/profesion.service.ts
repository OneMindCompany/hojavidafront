import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profesion } from '../interfaces/profesion';

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerProfesiones():Observable<Profesion[]>{
    const url = `${this.baseUrl}/Profesion/obtenerProfesiones`;
    return this.http.get<Profesion[]>(url);
  }
}
