import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Etnia } from '../../interfaces/etnia';
import { EtniaService } from '../../services/etnia.service';

@Component({
  selector: 'app-select-etnia',
  templateUrl: './select-etnia.component.html',
  styles: [
  ]
})
export class SelectEtniaComponent implements OnInit {

  private _etniaId:number=1;

  etnias: Etnia[] = [];
  etniasFiltradas:Etnia[] = [];
  etniaSeleccionada:Etnia=new Etnia();

  @Input() set etniaIdInput(valor: number) {
    if(valor>0){
    this._etniaId = valor;
    this.etniaPorDefecto();
  }
  }

  @Output() etniaId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    Etnia: [""],
  });
  constructor(
    private fb: FormBuilder,
    private etniaService:EtniaService
  ) { 
    this.etniaService.obtenerEtnias().subscribe(resp=>{this.etnias=resp;this.etniaPorDefecto() })
  }
  ngOnInit(): void {
    this.form.get("Etnia")?.valueChanges.subscribe(etnia=>{
      this.etniaId.emit(etnia.id);
    })
  }
  // Selecciona Ninguna por defecto.
  etniaPorDefecto():void{
    let etnia = this.etnias.find(etnia=>etnia.id==this._etniaId);
    if(etnia){
      this.form.reset({
        Etnia:etnia,
      });
      
    }
    
  }
  
  filtrarEtnia(event: any) {
    let filtered: Etnia[] = [];
    let query = event.query;
    for (let i = 0; i < this.etnias.length; i++) {
      let etnia = this.etnias[i];
      if (etnia.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(etnia);
      }
    }
    this.etniasFiltradas = filtered;
  }
 
}
