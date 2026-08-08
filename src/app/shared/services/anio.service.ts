import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnioService {

  anios:number[]=[]
  constructor() { }

  obtenerAnios():Observable<number[]> {
    this.anios=[]
    let anioActual = new Date().getFullYear();
    let anioSiguiente = anioActual + 1;
    this.anios.push( anioActual );
    this.anios.push(anioSiguiente);
    return of<number[]>(this.anios);
  }
}
