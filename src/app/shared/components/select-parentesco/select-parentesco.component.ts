import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Parentesco } from '../../interfaces/parentesco';
import { ParentescoService } from '../../services/parentesco.service';

@Component({
  selector: 'app-select-parentesco',
  templateUrl: './select-parentesco.component.html',
  styles: [
  ]
})
export class SelectParentescoComponent implements OnInit {

  private _parentescoId:number=1;
  parentescos: Parentesco[] = [];
  parentescosFiltrados: Parentesco[] = [];
  parentescoSeleccionado: Parentesco = new Parentesco();


  @Input() set parentescoIdInput(valor: number) {
    if(valor>0){
    this._parentescoId = valor;
    this.parentescoPorDefecto();
  }
  }
  @Output() parentescoId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    parentesco: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private parentescoService: ParentescoService
  ) {
    this.parentescoService.obtenerParentescos().subscribe(resp => { this.parentescos = resp; this.parentescoPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("parentesco")?.valueChanges.subscribe(parentesco => {
      this.parentescoId.emit(parentesco.id);
    })
  }

  // Selecciona por defecto.
  parentescoPorDefecto(): void {
    let parentesco = this.parentescos.find(parentesco => parentesco.id == this._parentescoId);
    if (parentesco) {
      this.form.reset({
        parentesco: parentesco,
      });

    }

  }
  filtrarParentesco(event: any) {
    let filtered: Parentesco[] = [];
    let query = event.query;
    for (let i = 0; i < this.parentescos.length; i++) {
      let parentesco = this.parentescos[i];
      if (parentesco.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(parentesco);
      }
    }
    this.parentescosFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
