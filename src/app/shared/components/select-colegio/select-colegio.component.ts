import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColegioBase } from '../../interfaces/colegio';
import { ColegioService } from '../../services/colegio.service';

@Component({
  selector: 'app-select-colegio',
  templateUrl: './select-colegio.component.html',
  styles: [
  ]
})
export class SelectColegioComponent implements OnInit {

  private _colegioId:number=0;
  colegios: ColegioBase[] = [];
  colegiosFiltrados:ColegioBase[] = [];
  colegioSeleccionado:ColegioBase=new ColegioBase();

  @Input() set colegioIdInput(valor: number) {
    if(valor>0){
    this._colegioId = valor;
    this.colegioPorDefecto();
  }
  }
  
  @Output() colegioId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    colegio: ["", Validators.required],
    
  });
  constructor(
    private fb: FormBuilder,
    private colegioService:ColegioService
  ) { 
    this.colegioService.obtenerColegiosBase().subscribe(resp=>{this.colegios=resp;this.colegioPorDefecto();})
  }
  ngOnInit(): void {
    this.form.get("colegio")?.valueChanges.subscribe(colegio=>{
      this.colegioId.emit(colegio.id);
    })
  }
  
  // Selecciona colegio de prueba por defecto.
  colegioPorDefecto():void{
    let colegio = this.colegios.find(colegio=>colegio.id==this._colegioId);
    if(colegio){
      this.form.reset({
        colegio:colegio,
      });
      
    }
    
  }
  filtrarColegio(event: any) {
    let filtered: ColegioBase[] = [];
    let query = event.query;
    //console.log(query);
    for (let i = 0; i < this.colegios.length; i++) {
      let colegio = this.colegios[i];
      if (colegio.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(colegio);
      }
    }
    this.colegiosFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
