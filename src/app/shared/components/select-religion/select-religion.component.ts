import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Religion } from '../../interfaces/religion';
import { ReligionService } from '../../services/religion.service';

@Component({
  selector: 'app-select-religion',
  templateUrl: './select-religion.component.html',
  styles: [
  ]
})
export class SelectReligionComponent implements OnInit {

  private _religionId:number=1;
  religiones: Religion[] = [];
  religionesFiltradas:Religion[] = [];
  religionSeleccionada:Religion=new Religion();

  @Input() set religionIdInput(valor: number) {
    if(valor>0){
    this._religionId = valor;
    this.religionPorDefecto();
  }
  }

  @Output() religionId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    religion: [""],
  });
  constructor(
    private fb: FormBuilder,
    private religionService:ReligionService
  ) { 
    this.religionService.obtenerReligiones().subscribe(resp=>{this.religiones=resp;this.religionPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("religion")?.valueChanges.subscribe(religion=>{
      this.religionId.emit(religion.id);
    })
  }
   // Selecciona Ninguna por defecto.
   religionPorDefecto():void{
    let religion = this.religiones.find(religion=>religion.id==this._religionId);
    if(religion){
      this.form.reset({
        religion:religion,
      });
      
    }
    
  }
  
  
  filtrarReligion(event: any) {
    let filtered: Religion[] = [];
    let query = event.query;
    for (let i = 0; i < this.religiones.length; i++) {
      let religion = this.religiones[i];
      if (religion.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(religion);
      }
    }
    this.religionesFiltradas = filtered;
  }

}
