import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/shared/interfaces/respuesta-servicio';
import { environment } from 'src/environments/environment';
import { DeclaracionDeCompromiso, FilaDeclaracionDeCompromiso } from '../models/daclaracion-de-compromiso';

@Injectable({
  providedIn: 'root'
})
export class DeclaracionesDeCompromisoService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http:HttpClient) { }
  obtenerDeclaraciones(colegioId:number):Observable<Respuesta<FilaDeclaracionDeCompromiso[]>>{
    const url = `${this.baseUrl}/DeclaracionDeCompromiso/ObtenerDeclaracionesDeCompromiso`;
    const params=new HttpParams()
    .set('colegioId',colegioId);
    return this.http.get<Respuesta<FilaDeclaracionDeCompromiso[]>>(url, {params})
  }
  guardarDeclaracion(datos:DeclaracionDeCompromiso):Observable<Respuesta<DeclaracionDeCompromiso>>
  {
    const url = `${this.baseUrl}/DeclaracionDeCompromiso/GuardarDeclaracion`;
    const body=datos;
    return this.http.post<Respuesta<DeclaracionDeCompromiso>>(url, body);
  }
  eliminarDeclaracion(id:number):Observable<Respuesta<DeclaracionDeCompromiso>>
  {
    const url = `${this.baseUrl}/DeclaracionDeCompromiso/EliminarDeclaracion`;
    const body=id;
    return this.http.post<Respuesta<DeclaracionDeCompromiso>>(url, body);
  }
}
