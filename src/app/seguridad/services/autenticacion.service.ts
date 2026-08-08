import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {  map,tap} from "rxjs/operators";


import { RegistroUsuario, TokenResponse, Usuario } from '../interfaces/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../../shared/interfaces/respuesta-servicio';
import { Observable, of } from 'rxjs';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!:Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  //Login de Usuario
  login(Run: string, Password: string):Observable<Respuesta<TokenResponse>> {

    const url = `${this.baseUrl}/Cuenta/Login`;
    const body = { Run, Password };
    
    return this.http.post<Respuesta<TokenResponse>>(url, body)
    .pipe(
      tap(resp=>{
        if(resp.estado==='ok'){
          localStorage.setItem('token',resp.valor.token);
          // this.getTokenDecoded();
        }
      }),
      map(resp=>resp)
      
      );
  }
  //Registro de Apoderados no dependen de un colegio
  register(Run: string, Password: string, ColegioId:number,PersonaId:number,RolId:string,Email:string):Observable<Respuesta<RegistroUsuario>> {
    const url = `${this.baseUrl}/Usuario/CrearUsuario`
    const body:RegistroUsuario = { Run, Password,ColegioId,PersonaId,RolId,Email };
    return this.http.post<Respuesta<RegistroUsuario>>(url, body);
  }
  //Decodifica un Token
  getTokenDecoded():Observable<boolean>{
    const helper=new JwtHelperService();
    const token=localStorage.getItem('token');
    if(token!=null){
      const decodedToken = helper.decodeToken(token);
      //console.log(decodedToken);
      this._usuario={usuarioNombre:decodedToken.personaNombre,colegioLogo:decodedToken.colegioLogo, colegioNombre:decodedToken.colegioNombre, autenticado:true,rol:decodedToken.role,colegioId:decodedToken.colegioId};
      return of(true);
      //localStorage.setItem('datosUsuario',JSON.stringify(decodedToken));
    }else{
      this._usuario={usuarioNombre:"",colegioLogo:"", colegioNombre:"", autenticado:false,rol:'', colegioId:0};
      return of(true);
    }
  }
  getTokenDecodedLogin():Observable<boolean>{
    const helper=new JwtHelperService();
    const token=localStorage.getItem('token');
    if(token!=null){
      const decodedToken = helper.decodeToken(token);
      this._usuario={usuarioNombre:decodedToken.personaNombre,colegioLogo:decodedToken.colegioLogo, colegioNombre:decodedToken.colegioNombre, autenticado:true,rol:decodedToken.role,colegioId:decodedToken.colegioId};
      return of(true);
    }else{
      this._usuario={usuarioNombre:"",colegioLogo:"", colegioNombre:"", autenticado:false,rol:'', colegioId:0};
      return of(false);
    }
  }
  

  obtenerRoles():Observable<Rol[]>{
    const url = `${this.baseUrl}/Rol/ObtenerRoles`;
    return this.http.get<Rol[]>(url);
  }
}
