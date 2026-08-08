
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoCivil } from '../../interfaces/estado-civil';
import { EstadoCivilService } from '../../services/estado-civil.service';

@Component({
  selector: 'app-select-estado-civil',
  templateUrl: './select-estado-civil.component.html',
  styles: [
  ]
})
export class SelectEstadoCivilComponent implements OnInit {

  private _estadoCivilId:number=2;
  estadosCiviles: EstadoCivil[] = [];
  estadosCivilesFiltrados: EstadoCivil[] = [];
  estadoCivilSeleccionado: EstadoCivil = new EstadoCivil();


  @Input() set estadoCivilIdInput(valor: number) {
    if(valor>0){
    this._estadoCivilId = valor;
    this.estadoCivilPorDefecto();
  }
  }
  @Output() estadoCivilId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    estadoCivil: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private estadoCivilService: EstadoCivilService
  ) {
    this.estadoCivilService.obtenerEstadosCiviles().subscribe(resp => { this.estadosCiviles = resp; this.estadoCivilPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("estadoCivil")?.valueChanges.subscribe(estadoCivil => {
      this.estadoCivilId.emit(estadoCivil.id);
    })
  }

  estadoCivilPorDefecto(): void {
    let estadoCivil = this.estadosCiviles.find(estadoCivil => estadoCivil.id == this._estadoCivilId);
    if (estadoCivil) {
      this.form.reset({
        estadoCivil: estadoCivil,
      });

    }

  }
  filtrarEstadoCivil(event: any) {
    let filtered: EstadoCivil[] = [];
    let query = event.query;
    for (let i = 0; i < this.estadosCiviles.length; i++) {
      let estadoCivil = this.estadosCiviles[i];
      if (estadoCivil.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(estadoCivil);
      }
    }
    this.estadosCivilesFiltrados= filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
