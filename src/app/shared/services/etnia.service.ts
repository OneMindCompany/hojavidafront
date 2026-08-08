import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Etnia } from '../interfaces/etnia';

@Injectable({
  providedIn: 'root'
})
export class EtniaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerEtnias():Observable<Etnia[]>{
    const url = `${this.baseUrl}/Etnia/obtenerEtnias`;
    return this.http.get<Etnia[]>(url);
  }

}
