import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnioService } from '../../services/anio.service';

@Component({
  selector: 'app-select-anio',
  templateUrl: './select-anio.component.html',
  styles: [
  ]
})
export class SelectAnioComponent implements OnInit {

  private _anio:number=0;

  anios: number[] = [];
  aniosFiltrados:number[] = [];
  anioSeleccionado:number=0;

  @Input() set anioInput(valor: number) {
    if(valor>0){
    this._anio = valor;
    this.anioPorDefecto();
  }
  }

  @Output() anio:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    anio: [0, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private anioService:AnioService
  ) { 
    this.anioService.obtenerAnios().subscribe(resp=>{this.anios=resp;this.anioPorDefecto();});
  }
  ngOnInit(): void {
    
    this.form.get("anio")?.valueChanges.subscribe(resp=>{
      this.anio.emit(resp);
    })  
  }

  // Selecciona chile por defecto.
  anioPorDefecto():void{
    if(this._anio>0){
    let anio = this.anios.find(anio=>anio==this._anio);
    if(anio){
      this.form.reset({
        anio:anio,
      });
      
    }
  }
  }
  filtrarAnio(event: any) {
    let filtered: number[] = [];
    let query = event.query;
    for (let i = 0; i < this.anios.length; i++) {
      let anio = this.anios[i];
      if (anio.toString().search(query) != -1) {
        filtered.push(anio);
      }
    }
    this.aniosFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
