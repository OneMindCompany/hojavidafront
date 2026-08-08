import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AutenticacionService } from '../seguridad/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class DecodificarTokenGuard implements CanActivate, CanLoad {
  constructor(private autenticacionService:AutenticacionService, private router:Router){

  }
  canActivate(): Observable<boolean > | boolean {
    return this.autenticacionService.getTokenDecoded();
  }
  canLoad(): Observable<boolean >  | boolean  {
    return this.autenticacionService.getTokenDecoded();
  }
}
