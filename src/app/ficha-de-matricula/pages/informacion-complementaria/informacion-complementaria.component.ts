import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProblemaDeSalud } from 'src/app/shared/interfaces/problemaDeSalud';
import { DatosComplementarios } from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-informacion-complementaria',
  templateUrl: './informacion-complementaria.component.html',
  styleUrls: ['./informacion-complementaria.component.css']
})

export class InformacionComplementariaComponent implements OnInit {


  cargando: boolean = false;
  matriculaId: number = 0;
  datosComplementarios: DatosComplementarios = new DatosComplementarios();
  formulario: FormGroup = this.fb.group({
    matriculaId: [0],
    previsionId: ['', Validators.required],
    problemasDeSaludSeleccionados: [""],
    contraindicacionActividadFisica: [false],
    tratamientoMedico: [false],
    detalleSalud: [''],
    procedenciaAlumno: [false, Validators.required],
    nombreOtroColegio: ['', Validators.required],
    dependenciaOtroColegio: ['Municipal', Validators.required],
    motivoDeCambio: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matriculaService: MatriculaService,
    private messageService: MessageService
  ) 
  {
    if (localStorage.getItem('nuevaMatricula')) {
      const { matriculaId } = JSON.parse(localStorage.getItem('nuevaMatricula')!);
      this.matriculaId = matriculaId;
      this.matriculaService.obtenerDatosComplementarios(matriculaId).subscribe(resp => {
        if (resp.estado == "ok") {
          this.datosComplementarios = resp.valor;
          this.formulario.patchValue({
            matriculaId: matriculaId,
            previsionId: this.datosComplementarios.previsionDeSaludId,
            contraindicacionActividadFisica: this.datosComplementarios.contraindicacionDeActividadFisica,
            tratamientoMedico: this.datosComplementarios.tratamientoMedico,
            detalleSalud: this.datosComplementarios.detalleDeSalud,
            procedenciaAlumno: this.datosComplementarios.procedenciaMismoColegio,
            nombreOtroColegio: this.datosComplementarios.nombreDelOtroColegio,
            dependenciaOtroColegio: this.datosComplementarios.dependenciaDelOtroColegio,
            motivoDeCambio: this.datosComplementarios.motivoDeCambio
          });
          
          let problemas=JSON.parse(this.datosComplementarios.problemasDeSalud);
          this.recibirProblemas(problemas)
        }
      });
    }
  }

  ngOnInit(): void {

  }

  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  //Select Prevision
  recibirPrevisionId(previsionId: number) {
    this.formulario.get('previsionId')?.reset(previsionId);
  }
  //Select Problemas de salud
  recibirProblemas(problemas: ProblemaDeSalud[]) {
    this.formulario.get('problemasDeSaludSeleccionados')?.reset(problemas);
  }

  //Envio de formulario para registro
  guardarDatosComplementariosDeAlumno() {
    if(!this.formulario.value.procedenciaAlumno){
      this.formulario.patchValue({
        nombreOtroColegio: "Colegio",
        dependenciaOtroColegio: "Municipal",
        motivoDeCambio: "ninguno"
      });
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if(!this.formulario.value.procedenciaAlumno){
      this.formulario.patchValue({
        nombreOtroColegio: "",
        dependenciaOtroColegio: "",
        motivoDeCambio: ""
      });
    }
    this.cargando = true;
    const {
      previsionId,
      problemasDeSaludSeleccionados,
      contraindicacionActividadFisica,
      tratamientoMedico,
      detalleSalud,
      procedenciaAlumno,
      nombreOtroColegio,
      dependenciaOtroColegio,
      motivoDeCambio } = this.formulario.value;
    let datosComplementarios = new DatosComplementarios();
    datosComplementarios = {
      matriculaId: this.matriculaId,
      previsionDeSaludId: previsionId,
      problemasDeSalud: JSON.stringify(problemasDeSaludSeleccionados),
      contraindicacionDeActividadFisica: contraindicacionActividadFisica,
      tratamientoMedico,
      detalleDeSalud: detalleSalud,
      procedenciaMismoColegio: procedenciaAlumno,
      nombreDelOtroColegio: nombreOtroColegio,
      dependenciaDelOtroColegio: dependenciaOtroColegio,
      motivoDeCambio
    };

    this.matriculaService.guardarDatosComplementarios(datosComplementarios)
      .subscribe(resp => {
        this.cargando = false;
        if (resp.estado === "ok") {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
          this.router.navigate(['/fichadematricula/apoderadot'])
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
        }
      })
  }

}
