import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TenenciaDeVivienda } from '../../interfaces/tenencia-de-vivienda';
import { TenenciaDeViviendaService } from '../../services/tenencia-de-vivienda.service';

@Component({
  selector: 'app-select-tenencia-de-vivienda',
  templateUrl: './select-tenencia-de-vivienda.component.html',
  styles: [
  ]
})
export class SelectTenenciaDeViviendaComponent implements OnInit {

  private _tenenciaDeViviendaId:number=6;
  tenenciaDeViviendas: TenenciaDeVivienda[] = [];
  tenenciaDeViviendasFiltrados: TenenciaDeVivienda[] = [];
  tenenciaDeViviendaSeleccionada: TenenciaDeVivienda = new TenenciaDeVivienda();


  @Input() set tenenciaDeViviendaIdInput(valor: number) {
    if(valor>0){
    this._tenenciaDeViviendaId = valor;
    this.tenenciaDeViviendaPorDefecto();
  }
  }
  @Output() tenenciaDeViviendaId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    tenenciaDeVivienda: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private tenenciaDeViviendaService: TenenciaDeViviendaService
  ) {
    this.tenenciaDeViviendaService.obtenerTenenciasDeVivienda().subscribe(resp => { this.tenenciaDeViviendas = resp; this.tenenciaDeViviendaPorDefecto(); })
  }
  ngOnInit(): void {
    this.form.get("tenenciaDeVivienda")?.valueChanges.subscribe(tenenciaDeVivienda => {
      this.tenenciaDeViviendaId.emit(tenenciaDeVivienda.id);
    })
  }

  // Selecciona por defecto.
  tenenciaDeViviendaPorDefecto(): void {
    let tenenciaDeVivienda = this.tenenciaDeViviendas.find(tenenciaDeVivienda => tenenciaDeVivienda.id == this._tenenciaDeViviendaId);
    if (tenenciaDeVivienda) {
      this.form.reset({
        tenenciaDeVivienda: tenenciaDeVivienda,
      });

    }

  }
  filtrarTenenciaDeVivienda(event: any) {
    let filtered: TenenciaDeVivienda[] = [];
    let query = event.query;
    for (let i = 0; i < this.tenenciaDeViviendas.length; i++) {
      let tenenciaDeVivienda = this.tenenciaDeViviendas[i];
      if (tenenciaDeVivienda.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(tenenciaDeVivienda);
      }
    }
    this.tenenciaDeViviendasFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

}
