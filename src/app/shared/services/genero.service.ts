import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Genero } from '../interfaces/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private baseUrl: string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  obtenerGeneros():Observable<Genero[]>{
    const url = `${this.baseUrl}/Genero/obtenerGeneros`;
    return this.http.get<Genero[]>(url);
  }
}
