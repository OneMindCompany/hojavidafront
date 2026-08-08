import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursoColegio } from '../../../shared/interfaces/cursoColegio';
import { MatriculaService } from '../../services/matricula.service';
import { NuevaMatricula } from '../../models/matricula';
import { MessageService } from 'primeng/api';
import { AutenticacionService } from '../../../seguridad/services/autenticacion.service';


@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  cargando: boolean = false;
  get usuario() {
    return this.autenticacionService.usuario;
  }
  formulario: FormGroup = this.fb.group({
    matriculaId: [0],
    colegioId: [0, Validators.required],
    anio: ['', Validators.required],
    rut: ['', Validators.required],
    curso: [new CursoColegio(), Validators.required],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private matriculaService: MatriculaService,
    private autenticacionService: AutenticacionService,
    private messageService: MessageService
  ) {
    // console.log(this.usuario.rol);
    this.formulario.patchValue({
      colegioId: this.usuario.colegioId
    });
    const nuevaMatricula = localStorage.getItem('nuevaMatricula');
    if (nuevaMatricula) {
      const nueva = JSON.parse(nuevaMatricula);
      const curso = new CursoColegio();
      let colegioId = this.usuario.colegioId;
      
      if (this.usuario.rol == "Administrador" || this.usuario.rol == "Funcionario") {
        this.formulario.patchValue({
          colegioId: colegioId
        });
      } else {
        this.formulario.patchValue({
          colegioId: nueva.colegioId
        });
      }
      curso.cursoId = nueva.cursoId;
      curso.codigoDeEnsenanza = nueva.tipoDeEnsenanza;
      this.formulario.patchValue({
        matriculaId: nueva.matriculaId,
        anio: nueva.anio,
        rut: nueva.rut,
        curso: curso
      });
    }

  }

  ngOnInit(): void {
    if (this.usuario.rol == "Administrador" || this.usuario.rol == "Funcionario") {
      this.formulario.patchValue({
        colegioId: this.usuario.colegioId
      });
    }
  }

  guardarNuevaMatricula() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    const { colegioId, anio, rut, matriculaId, curso: { cursoId, codigoDeEnsenanza: tipoDeEnsenanza } } = this.formulario.value;
    let nuevaMatricula = new NuevaMatricula();
    //conversion por que de otro modo genera error.
    let colId = parseInt(colegioId);
    nuevaMatricula = { colegioId: colId, anio, rut, cursoId, tipoDeEnsenanza, matriculaId };
    this.matriculaService.guardarDatosDeMatricula(nuevaMatricula)
      .subscribe(resp => {
        this.cargando = false;
        if (resp.estado === "ok") {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
          this.router.navigate(['/fichadematricula/alumno']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
        }
      })


  }

  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }
  //Select Colegio
  recibirColegioId(colegioId: number) {
    this.formulario.get('colegioId')?.reset(colegioId);
  }
  //Select Anio
  recibirAnio(valor: number) {
    this.formulario.get('anio')?.reset(valor);
  }
  //Select Curso
  recibirCurso(valor: CursoColegio) {
    this.formulario.get('curso')?.reset(valor);
  }

}
