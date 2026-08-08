import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from '../../interfaces/region';
import { RegionService } from '../../services/region.service';

@Component({
  selector: 'app-select-region',
  templateUrl: './select-region.component.html',
  styles: [
  ]
})
export class SelectRegionComponent implements OnInit {

  private _regionId:number=13;
  regiones: Region[] = [];
  regionesFiltradas:Region[] = [];
  regionSeleccionada:Region=new Region();

  @Input() set regionIdInput(valor: number) {
    if(valor>0){
    this._regionId = valor;
    this.regionPorDefecto();
  }
  }

  @Output() regionId:EventEmitter<number>=new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    Region: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private regionService:RegionService
  ) { 
    this.regionService.obtenerRegiones().subscribe(resp=>{this.regiones=resp;this.regionPorDefecto();})
  }
  ngOnInit(): void {
    this.form.get("Region")?.valueChanges.subscribe(region=>{
      this.regionId.emit(region.id);
    })
  }
  
  // Selecciona region Metropolitana por defecto.
  regionPorDefecto():void{
    let region = this.regiones.find(region=>region.id==this._regionId);
    if(region){
      this.form.reset({
        Region:region,
      });
      
    }
    
  }
  filtrarRegion(event: any) {
    let filtered: Region[] = [];
    let query = event.query;
    for (let i = 0; i < this.regiones.length; i++) {
      let region = this.regiones[i];
      if (region.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(region);
      }
    }
    this.regionesFiltradas = filtered;
  }

  campoNoEsValido(campo: string) {

    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
 

}
