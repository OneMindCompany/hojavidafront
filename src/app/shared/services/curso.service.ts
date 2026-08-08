import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/curso';
import { CursoColegio } from '../interfaces/cursoColegio';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  obtenerCursos(gestion:string, codigoEnsenanza:string, colegioId:number):Observable<Curso>{
    const url = `${this.baseUrl}/CursoColegio/obtenerCursosColegio`;
    const params=new HttpParams()
   .set('gestion',gestion)
   .set('colegioId',colegioId)
   .set('codigoEnsenanza',codigoEnsenanza);
    return this.http.get<Curso>(url, { params});
  }

  //los cursos base son cursos, que tenga un determinado colegio, pero obteniendo solo con la informacion base.
  obtenerCursosBase(gestion:number, colegioId:number):Observable<CursoColegio[]>{
    const url = `${this.baseUrl}/CursoColegio/obtenerCursosColegioBase`;
    const params=new HttpParams()
   .set('gestion',gestion)
   .set('colegioId',colegioId)
    return this.http.get<CursoColegio[]>(url, { params});
  }


}
