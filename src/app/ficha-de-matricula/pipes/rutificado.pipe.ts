import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutificado'
})
export class RutificadoPipe implements PipeTransform {

  public transform(value: any): string {
    let rut:string;
    rut = value.toString();
    let digitoVerificador = rut[rut.length-1];
    rut = rut.substr(0,rut.length-1 );
     let rutNumber:number;
     rutNumber =  +rut;
     let rutStr = rutNumber.toLocaleString()+"-"+digitoVerificador;
     var newRutStr = rutStr.replace(/,/g, '.');
 
    return newRutStr;
  }

}
