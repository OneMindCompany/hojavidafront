import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoColegio } from '../../interfaces/cursoColegio';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-select-curso-colegio',
  templateUrl: './select-curso-colegio.component.html',
  styles: [
  ]
})
export class SelectCursoColegioComponent implements OnInit {



  private _curso: CursoColegio = new CursoColegio();
  private _colegioId: number = 1;
  private _anio: number = 0;
  cursos: CursoColegio[] = [];
  cursosFiltrados: CursoColegio[] = [];
  cursoSeleccionado: CursoColegio = new CursoColegio();

  @Input() set colegioId(valor: number) {
    if(valor>0){
    this._colegioId = valor;
    this.nuevosCursos();
  }
  }
  @Input() set anio(valor: number) {
    if(valor>0){
    this._anio = valor;
    this.nuevosCursos();
    }
  }

  @Input() set cursoInput(valor: CursoColegio) {
    this._curso = valor;

  };
  @Output() curso: EventEmitter<CursoColegio> = new EventEmitter<CursoColegio>();

  form: FormGroup = this.fb.group({
    curso: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService
  ) {

  }
  ngOnInit(): void {
    this.form.get("curso")?.valueChanges.subscribe(curso => {
      this.curso.emit(curso);
    })
  }

  // Selecciona chile por defecto.
  cursoPorDefecto(): void {
    if (this._curso != null) {
      let curso = this.cursos.find(curso => (curso.cursoId == this._curso.cursoId && curso.codigoDeEnsenanza==this._curso.codigoDeEnsenanza));
      if (curso) {
        this.form.reset({
          curso: curso
        });
      }
    }
  }
  filtrarCurso(event: any) {
    let filtered: CursoColegio[] = [];
    let query = event.query;
    for (let i = 0; i < this.cursos.length; i++) {
      let curso = this.cursos[i];
      if (curso.nombreCurso.normalize("NFD").replace(/[\u0300-\u036f]/g,'').toLowerCase().search(query.toLowerCase()) !=-1) {
        filtered.push(curso);
      }
    }
    this.cursosFiltrados = filtered;
  }

  campoNoEsValido(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
  nuevosCursos(): void {
    if (this._colegioId > 0 && this._anio > 2020) {

      this.cursoService.obtenerCursosBase(this._anio, this._colegioId).subscribe(resp => { this.cursos = resp; this.cursoPorDefecto(); })
    }
  }

}
