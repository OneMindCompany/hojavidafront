import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profesion } from '../../interfaces/profesion';
import { ProfesionService } from '../../services/profesion.service';

@Component({
  selector: 'app-select-profesion',
  templateUrl: './select-profesion.component.html',
  styles: [
  ]
})
export class SelectProfesionComponent implements OnInit {

  private _profesionId:number=97;
  profesiones: Profesion[] = [];
  profesionesFiltradas: Profesion[] = [];
  profesionSeleccionada: Profesion = new Profesion();


  @Input() set profesionIdInput(valor: number) {
    if(valor>0){
    this._profesionId = valor;
    this.profesionPorDefecto();
  }
  }
  @Output() profesionId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    profesion: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private profesionService: ProfesionService
  ) {
    this.profesionService.obtenerProfesiones().subscribe(resp => { this.profesiones = resp; this.profesionPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("profesion")?.valueChanges.subscribe(profesion => {
      this.profesionId.emit(profesion.id);
    })
  }

  // Selecciona por defecto.
  profesionPorDefecto(): void {
    let profesion = this.profesiones.find(profesion => profesion.id == this._profesionId);
    if (profesion) {
      this.form.reset({
        profesion: profesion,
      });

    }

  }
  filtrarProfesion(event: any) {
    let filtered: Profesion[] = [];
    let query = event.query;
    for (let i = 0; i < this.profesiones.length; i++) {
      let profesion = this.profesiones[i];
      if (profesion.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(profesion);
      }
    }
    this.profesionesFiltradas = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
