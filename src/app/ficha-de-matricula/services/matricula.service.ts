import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatosDeAlumno, FilaPreMatricuala, NuevaMatricula, DatosComplementarios, Apoderado, FichaDeMatriculaReporte, EncargadoDeRetiro } from '../models/matricula';
import { Respuesta } from 'src/app/shared/interfaces/respuesta-servicio';
import { tap,map } from 'rxjs/operators';
import{saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  //Pantalla Uno de Nueva Matrícula.
  guardarDatosDeMatricula(datos:NuevaMatricula):Observable<Respuesta<NuevaMatricula>>{
    const url = `${this.baseUrl}/FichaDeMatricula/GuardarDatosDematricula`;
    const body=datos;
    return this.http.post<Respuesta<NuevaMatricula>>(url, body).pipe(
      tap(resp=>{
        if(resp.estado==='ok'){
          localStorage.setItem('nuevaMatricula',JSON.stringify(resp.valor));
        }
      }))
  };

  //Pantalla Uno Resumen de Matrículas
  obtenerPreMatriculas():Observable<Respuesta<FilaPreMatricuala[]>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerPreMatriculas`;
    return this.http.get<Respuesta<FilaPreMatricuala[]>>(url)
  }

  //Pantalla Dos, Guardar  Datos de Alumno
  guardarDatosDeAlumno(formulario:FormData):Observable<Respuesta<DatosDeAlumno>>
  {
    const url = `${this.baseUrl}/FichaDeMatricula/GuardarDatosDelAlumno`;
    const body=formulario;
    return this.http.post<Respuesta<DatosDeAlumno>>(url, body).pipe(
      tap(resp=>{
        if(resp.estado==='ok'){
          localStorage.setItem('datosDeAlumno',JSON.stringify(resp.valor));
        }
      })
      )
  }

  //Pantalla Dos, Obtener Datos de alumno.
  obtenerDatosDeAlumno(matriculaId:number):Observable<Respuesta<DatosDeAlumno>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerDatosDelAlumno`;
    const params=new HttpParams()
    .set('matriculaId',matriculaId);
    return this.http.get<Respuesta<DatosDeAlumno>>(url, {params})
  }
  //Pantalla Tres, Guardar  Datos Complementarios del Alumno
  guardarDatosComplementarios(datos:DatosComplementarios):Observable<Respuesta<DatosComplementarios>>
  {
    const url = `${this.baseUrl}/FichaDeMatricula/GuardarDatosComplementarios`;
    const body=datos;
    return this.http.post<Respuesta<DatosComplementarios>>(url, body).pipe(
      tap(resp=>{
        if(resp.estado==='ok'){
          localStorage.setItem('datosComplementarios',JSON.stringify(resp.valor));
        }
      }))
  }
  //Pantalla Tres, Obtener Datos de alumno.
  obtenerDatosComplementarios(matriculaId:number):Observable<Respuesta<DatosComplementarios>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerDatosComplementarios`;
    const params=new HttpParams()
    .set('matriculaId',matriculaId)
    return this.http.get<Respuesta<DatosComplementarios>>(url, {params})
  }
   //Pantalla Cuatro y Cinco, Guardar  Apoderado
   guardarApoderado(datos:Apoderado):Observable<Respuesta<Apoderado>>
   {
     const url = `${this.baseUrl}/FichaDeMatricula/GuardarApoderado`;
     const body=datos;
     return this.http.post<Respuesta<Apoderado>>(url, body)
   }
   obtenerApoderado(matriculaId:number,tipoApoderado:string):Observable<Respuesta<Apoderado>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerApoderado`;
    const params=new HttpParams()
    .set('matriculaId',matriculaId)
    .set('tipoApoderado',tipoApoderado)
    return this.http.get<Respuesta<Apoderado>>(url, {params})
  }
  obtenerApoderadoPorRut(rut:string):Observable<Respuesta<Apoderado>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerApoderadoPorRut`;
    const params=new HttpParams()
    .set('rut',rut)
    return this.http.get<Respuesta<Apoderado>>(url, {params})
  }

  //pantalla Encargado de retiro
  obtenerEncargadoDeRetiro(matriculaId:number):Observable<Respuesta<EncargadoDeRetiro>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerEncargadoDeRetiro`;
    const params=new HttpParams()
    .set('matriculaId',matriculaId)
    return this.http.get<Respuesta<EncargadoDeRetiro>>(url, {params})
  }
   //Pantalla guardar encargado de retiro
   guardarEncargadoDeRetiro(datos:EncargadoDeRetiro):Observable<Respuesta<EncargadoDeRetiro>>
   {
     const url = `${this.baseUrl}/FichaDeMatricula/GuardarEncargadoDeRetiro`;
     const body=datos;
     return this.http.post<Respuesta<EncargadoDeRetiro>>(url, body)
   }
   //Pantalla Reporte.
   obtenerFichaDeMatriculaReporte(matriculaId:number):Observable<Respuesta<FichaDeMatriculaReporte>>{
    const url = `${this.baseUrl}/FichaDeMatricula/ObtenerFichaDeMatriculaReporte`;
    const params=new HttpParams()
    .set('matriculaId',matriculaId)
    return this.http.get<Respuesta<FichaDeMatriculaReporte>>(url, {params})
  }
   //Boton Reporte.
   obtenerFichaDeMatriculaReportePDF(matriculaId:number, nombre:string){
    const url = `${this.baseUrl}/FichaDeMatricula/GenerarFichaDeMatriculaReporte`;
    const body=matriculaId;
    return this.http.post(url, body,{responseType:"blob"})
    .pipe(
      tap(content=>{
        const blob=new Blob([content],{type:"application/pdf"});
        saveAs(blob,nombre);
      }),
      map(()=>true)
    )
    ;
  }
}
