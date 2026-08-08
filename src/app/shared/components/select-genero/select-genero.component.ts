import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genero } from '../../interfaces/genero';
import { GeneroService } from '../../services/genero.service';

@Component({
  selector: 'app-select-genero',
  templateUrl: './select-genero.component.html',
  styles: [
  ]
})
export class SelectGeneroComponent implements OnInit {

  private _generoId:number=1;
  generos: Genero[] = [];
  generosFiltrados: Genero[] = [];
  generoSeleccionado: Genero = new Genero();

  @Input() set generoIdInput(valor: number) {
    if(valor>0){
    this._generoId = valor;
    this.generoPorDefecto();
  }
  }

  @Output() generoId: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup = this.fb.group({
    genero: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private generoService: GeneroService
  ) {
    this.generoService.obtenerGeneros().subscribe(resp => { this.generos = resp;this.generoPorDefecto();  })
  }

  ngOnInit(): void {
    this.form.get("genero")?.valueChanges.subscribe(genero => {
      this.generoId.emit(genero.id);
    })
    
  }

  generoPorDefecto(): void {
    let genero = this.generos.find(genero => genero.id == this._generoId);
    if (genero) {
      this.form.reset({
        genero: genero,
      });
    }
  }

  filtrarGenero(event: any) {
    let filtered: Genero[] = [];
    let query = event.query;
    for (let i = 0; i < this.generos.length; i++) {
      let genero = this.generos[i];
      if (genero.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(genero);
      }
    }
    this.generosFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
}
