import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NivelEducacional } from '../../interfaces/nivel-educacional';
import { NivelEducacionalService } from '../../services/nivel-educacional.service';

@Component({
  selector: 'app-select-nivel-educacional',
  templateUrl: './select-nivel-educacional.component.html',
  styles: [
  ]
})
export class SelectNivelEducacionalComponent implements OnInit {

  private _nivelEducacionalId:number=1;
  nivelesEducacionales: NivelEducacional[] = [];
  nivelesEducacionalesFiltrados: NivelEducacional[] = [];
  nivelEducacionalSeleccionado: NivelEducacional = new NivelEducacional();


  @Input() set nivelEducacionalIdInput(valor: number) {
    if(valor>0){
    this._nivelEducacionalId = valor;
    this.nivelEducacionalPorDefecto();
  }
  }
  @Output() nivelEducacionalId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    nivelEducacional: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private nivelEducacionalService: NivelEducacionalService
  ) {
    this.nivelEducacionalService.obtenerNivelesEducacionales().subscribe(resp => { this.nivelesEducacionales = resp; this.nivelEducacionalPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("nivelEducacional")?.valueChanges.subscribe(nivelEducacional => {
      this.nivelEducacionalId.emit(nivelEducacional.id);
    })
  }

  // Selecciona por defecto.
  nivelEducacionalPorDefecto(): void {
    let nivelEducacional = this.nivelesEducacionales.find(nivelEducacional => nivelEducacional.id == this._nivelEducacionalId);
    if (nivelEducacional) {
      this.form.reset({
        nivelEducacional: nivelEducacional,
      });

    }

  }
  filtrarNivelEducacional(event: any) {
    let filtered: NivelEducacional[] = [];
    let query = event.query;
    for (let i = 0; i < this.nivelesEducacionales.length; i++) {
      let nivelEducacional = this.nivelesEducacionales[i];
      if (nivelEducacional.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(nivelEducacional);
      }
    }
    this.nivelesEducacionalesFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
