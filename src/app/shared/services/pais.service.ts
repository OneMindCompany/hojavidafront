import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaisBase } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerPaises():Observable<PaisBase[]>{
    const url = `${this.baseUrl}/Pais/obtenerPaisesBase`;
    return this.http.get<PaisBase[]>(url);
  }
}
