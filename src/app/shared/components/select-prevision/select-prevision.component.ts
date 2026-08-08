import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prevision } from '../../interfaces/prevision';
import { PrevisionService } from '../../services/prevision.service';

@Component({
  selector: 'app-select-prevision',
  templateUrl: './select-prevision.component.html',
  styles: [
  ]
})
export class SelectPrevisionComponent implements OnInit {

  private _previsionId:number=1;
  previsiones: Prevision[] = [];
  previsionesFiltradas:Prevision[] = [];
  previsionSeleccionada:Prevision=new Prevision();
  

  @Input() set previsionIdInput(valor: number) {
    if(valor>0){
    this._previsionId = valor;
    this.previsionPorDefecto();
  }
  }
  @Output() previsionId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    prevision: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private previsionService:PrevisionService
  ) { 
    this.previsionService.obtenerPrevisiones().subscribe(resp=>{this.previsiones=resp;this.previsionPorDefecto();})
  }
  ngOnInit(): void {
    this.form.get("prevision")?.valueChanges.subscribe(prevision=>{
      this.previsionId.emit(prevision.id);
    })
  }
  
  // Selecciona prevision de prueba por defecto.
  previsionPorDefecto():void{
    let prevision = this.previsiones.find(prevision=>prevision.id==this._previsionId
  );
    if(prevision){
      this.form.reset({
        prevision:prevision,
      });
      
    }
    
  }
  filtrarPrevision(event: any) {
    let filtered: Prevision[] = [];
    let query = event.query;
    for (let i = 0; i < this.previsiones.length; i++) {
      let prevision = this.previsiones[i];
      if (prevision.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(prevision);
      }
    }
    this.previsionesFiltradas = filtered;
  }

  campoNoEsValido(campo: string) {

    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }


}
