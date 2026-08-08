import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AutenticacionService } from '../seguridad/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
 
  constructor(private autenticacionService:AutenticacionService, private router:Router){

  }

  canActivate(): Observable<boolean > | boolean {
    return this.autenticacionService.getTokenDecodedLogin()
    .pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/seguridad/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean >  | boolean  {
    return this.autenticacionService.getTokenDecodedLogin()
    .pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/seguridad/login');
        }
      })
    );
  }
}
