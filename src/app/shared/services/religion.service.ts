import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Religion } from '../interfaces/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  obtenerReligiones():Observable<Religion[]>{
    const url = `${this.baseUrl}/Religion/obtenerReligiones`;
    return this.http.get<Religion[]>(url);
  }
}
