import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Parentesco } from '../interfaces/parentesco';

@Injectable({
  providedIn: 'root'
})
export class ParentescoService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  obtenerParentescos():Observable<Parentesco[]>{
    const url = `${this.baseUrl}/Parentesco/obtenerParentescos`;
    return this.http.get<Parentesco[]>(url);
  }
}
