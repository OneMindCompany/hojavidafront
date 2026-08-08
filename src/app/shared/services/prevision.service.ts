import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Prevision } from '../interfaces/prevision';

@Injectable({
  providedIn: 'root'
})
export class PrevisionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  obtenerPrevisiones():Observable<Prevision[]>{
    const url = `${this.baseUrl}/PrevisionDeSalud/obtenerPrevisionesDeSalud`;

    return this.http.get<Prevision[]>(url);
  }
}
