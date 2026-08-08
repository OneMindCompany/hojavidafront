import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colegio, ColegioBase } from '../interfaces/colegio';
import { Respuesta } from '../interfaces/respuesta-servicio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  private baseUrl:string=environment.baseUrl;

  constructor(private http:HttpClient) { }
  //gestion de informacion del colegio
  obtenerColegio(colegioId:number):Observable<Respuesta<Colegio>>{
       const url=`${this.baseUrl}/colegio/obtenercolegio`;
       const params=new HttpParams()
       .set('colegioId',colegioId)
       return this.http.get<Respuesta<Colegio>>(url,{params});
  }

  actualizarColegio(formulario:FormData):Observable<Respuesta<Colegio>>{
    const url=`${this.baseUrl}/colegio/EditarColegio`;
    return this.http.post<Respuesta<Colegio>>(url,formulario);
  }

  //Obtiene todos los colegios con su información básica id,nombre y rbd.
  obtenerColegiosBase():Observable<ColegioBase[]>{
    const url=`${this.baseUrl}/colegio/obtenerColegiosBase`;
    return this.http.get<ColegioBase[]>(url);
  }
}
