import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunaBase} from '../../interfaces/comuna';
import { ComunaService } from '../../services/comuna.service';

@Component({
  selector: 'app-select-comuna',
  templateUrl: './select-comuna.component.html',
  styles: [
  ]
})
export class SelectComunaComponent implements OnInit {


  private _comunaId:number=279;
  private _regionId:number=13;
  comunas: ComunaBase[] = [];
  comunasFiltradas:ComunaBase[] = [];
  comunaSeleccionada:ComunaBase=new ComunaBase();
  @Input() set comunaIdInput(valor: number) {
    if(valor>0){
    this._comunaId = valor;
    this.comunaPorDefecto();
  }
  }
  @Input() set regionId(valor: number) {
    if(valor>0){
    this._regionId=valor;
    this.nuevasComunas();
    }
  }
  @Output() comunaId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    Comuna: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private comunaService:ComunaService
  ) { 
    
  }
  ngOnInit(): void {
    this.form.get("Comuna")?.valueChanges.subscribe(comuna=>{
      this.comunaId.emit(comuna.id);
    })
  }
  
  // Selecciona chile por defecto.
  comunaPorDefecto():void{
    let comuna = this.comunas.find(comuna=>comuna.id==this._comunaId);
    if(comuna){
      this.form.reset({
        Comuna:comuna
      });
      
    }
    
  }
  filtrarComuna(event: any) {
    let filtered: ComunaBase[] = [];
    let query = event.query;
    for (let i = 0; i < this.comunas.length; i++) {
      let comuna = this.comunas[i];
      if (comuna.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(comuna);
      }
    }
    this.comunasFiltradas = filtered;
  }

  campoNoEsValido(campo: string) {

    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
  nuevasComunas():void{
    this.comunaService.obtenerComunas(this._regionId).subscribe(resp=>{this.comunas=resp;this.comunaPorDefecto();})
  }

}
