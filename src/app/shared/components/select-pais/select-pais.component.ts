import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisBase } from '../../interfaces/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-select-pais',
  templateUrl: './select-pais.component.html',
  styles: [
  ]
})
export class SelectPaisComponent implements OnInit {

  private _paisId:number=11;
  paises: PaisBase[] = [];
  paisesFiltrados: PaisBase[] = [];
  paisSeleccionado: PaisBase = new PaisBase();


  @Input() set paisIdInput(valor: number) {
    if(valor>0){
    this._paisId = valor;
    this.paisPorDefecto();
  }
  }
  @Output() paisId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    pais: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private paisService: PaisService
  ) {
    this.paisService.obtenerPaises().subscribe(resp => { this.paises = resp; this.paisPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("pais")?.valueChanges.subscribe(pais => {
      this.paisId.emit(pais.id);
    })
  }

  // Selecciona chile por defecto.
  paisPorDefecto(): void {
    let pais = this.paises.find(pais => pais.id == this._paisId);
    if (pais) {
      this.form.reset({
        pais: pais,
      });

    }

  }
  filtrarPais(event: any) {
    let filtered: PaisBase[] = [];
    let query = event.query;
    for (let i = 0; i < this.paises.length; i++) {
      let pais = this.paises[i];
      if (pais.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(pais);
      }
    }
    this.paisesFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
