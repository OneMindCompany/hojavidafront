import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Apoderado} from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-apoderado-suplente',
  templateUrl: './apoderado-suplente.component.html',
  styleUrls: ['./apoderado-suplente.component.css']
})
export class ApoderadoSuplenteComponent implements OnInit {

  cargando: boolean = false;
  matriculaId:number=0;
  formulario: FormGroup = this.fb.group({
    matriculaId: [0],
    tipoApoderado: ['suplente'],
    rut: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    parentescoId: [0, Validators.required],
    generoId: [0, Validators.required],
    fechaNacimiento: ['', Validators.required],
    paisId: [0, Validators.required],
    etniaId: [''],
    religionId: [''],
    estadoCivilId: [0, Validators.required],
    tenenciaDeViviendaId: [0, Validators.required],
    calle: ['', Validators.required],
    nro: [0],
    dpto: [''],
    regionId: [0, Validators.required],
    comunaId: [0, Validators.required],
    celular: [''],
    fijo: [''],
    email: [''],
    nivelEducacionalId: [0, Validators.required],
    profesionId: [0, Validators.required],
    lugarTrabajo: [''],
    celularTrabajo: [''],
    fijoTrabajo: [''],
    emailTrabajo: [''],

  });

  get hermanosArr() {
    return this.formulario.get('hermanos') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matriculaService: MatriculaService,
    private messageService: MessageService
  ) {

    if (localStorage.getItem('nuevaMatricula')) {
      const { matriculaId } = JSON.parse(localStorage.getItem('nuevaMatricula')!);
      this.matriculaId=matriculaId;
      if (localStorage.getItem('datosDeAlumno')) {
        const { paisId,etniaId,religionId, calle, numero, departamento, regionId, comunaId } = JSON.parse(localStorage.getItem('datosDeAlumno')!);
        this.formulario.patchValue({
          paisId: paisId,
          etniaId: etniaId,
          religionId: religionId,
          calle: calle,
          nro: numero,
          dpto: departamento,
          regionId: regionId,
          comunaId: comunaId,
        });
      }
      this.formulario.patchValue({
        matriculaId: matriculaId
      });
      this.matriculaService.obtenerApoderado(matriculaId,"suplente").subscribe(resp => {
        if (resp.estado == "ok"&&resp.valor.rut) {
          let apoderado=resp.valor;
          localStorage.setItem('apoderadoSuplente',JSON.stringify(resp.valor));
          this.formulario.patchValue({
            matriculaId:apoderado.matriculaId,
            tipoApoderado:apoderado.tipoApoderado,
            rut:apoderado.rut,
            nombre:apoderado.nombre,
            apellidoPaterno:apoderado.apellidoPaterno,
            apellidoMaterno:apoderado.apellidoMaterno,
            parentescoId:apoderado.parentescoId,
            generoId:apoderado.generoId,
            fechaNacimiento:apoderado.fechaDeNacimiento,
            paisId:apoderado.paisId,
            etniaId:apoderado.etniaId,
            religionId:apoderado.religionId,
            estadoCivilId:apoderado.estadoCivilId,
            tenenciaDeViviendaId:apoderado.tenenciaDeViviendaId,
            calle:apoderado.calle,
            nro:apoderado.numero,
            dpto:apoderado.departamento,
            regionId:apoderado.regionId,
            comunaId:apoderado.comunaId,
            celular:apoderado.celular,
            fijo:apoderado.telefonoFijo,
            email:apoderado.correoElectronico,
            nivelEducacionalId:apoderado.nivelEducacionalId,
            profesionId:apoderado.profesionId,
            lugarTrabajo:apoderado.lugarDeTrabajo,
            celularTrabajo:apoderado.celularTrabajo,
            fijoTrabajo:apoderado.telefonoFijoTrabajo,
            emailTrabajo:apoderado.correoElectronicoTrabajo
          });
        }
      })
    }

  }
  ngOnInit(): void {

  }

  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  //Select Parentesco
  recibirParentescoId(parentescoId: number) {
    this.formulario.get('parentescoId')?.reset(parentescoId);

  }
  //Select EstadoCivil
  recibirEstadoCivilId(estadoCivilId: number) {
    this.formulario.get('estadoCivilId')?.reset(estadoCivilId);

  }
  //Select TenenciaDeVivienda
  recibirTenenciaDeViviendaId(tenenciaDeViviendaId: number) {
    this.formulario.get('tenenciaDeViviendaId')?.reset(tenenciaDeViviendaId);

  }
  //Select Nivel Educacional
  recibirNivelEducacionalId(nivelEducacionalId: number) {
    this.formulario.get('nivelEducacionalId')?.reset(nivelEducacionalId);

  }
  //Select Profesion
  recibirProfesionId(profesionId: number) {
    this.formulario.get('profesionId')?.reset(profesionId);

  }
  //Select Pais
  recibirPaisId(paisId: number) {
    this.formulario.get('paisId')?.reset(paisId);

  }
  //Select Etnia
  recibirEtniaId(etniaId: number) {
    this.formulario.get('etniaId')?.reset(etniaId);

  }
  //Select Genero
  recibirGeneroId(generoId: number) {
    this.formulario.get('generoId')?.reset(generoId);
  }
  //Select Religion
  recibirReligionId(religionId: number) {
    this.formulario.get('religionId')?.reset(religionId);

  }
  //Select Región
  recibirRegionId(regionId: number) {
    this.formulario.get('regionId')?.reset(regionId);
  }

  //Select Comuna
  recibirComunaId(comunaId: number) {
    this.formulario.get('comunaId')?.reset(comunaId);
  }
  //Envio de formulario para registro
  guardarDatosDeApoderado() {
    // console.log(this.formulario.value);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    //this.cargando = true;
    const {
      rut,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      parentescoId,
      generoId,
      fechaNacimiento,
      paisId,
      etniaId,
      religionId,
      estadoCivilId,
      tenenciaDeViviendaId,
      calle,
      nro,
      dpto,
      regionId,
      comunaId,
      celular,
      fijo,
      email,
      nivelEducacionalId,
      profesionId,
      lugarTrabajo,
      celularTrabajo,
      fijoTrabajo,
      emailTrabajo
    } = this.formulario.value;
    let apoderado=new Apoderado();
    apoderado={
    matriculaId:this.matriculaId,
    tipoApoderado:'suplente',
    rut,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    parentescoId,
    generoId,
    fechaDeNacimiento:fechaNacimiento,
    paisId,
    etniaId,
    religionId,
    estadoCivilId,
    tenenciaDeViviendaId,
    calle,
    numero:nro,
    departamento:dpto,
    regionId,
    comunaId,
    celular,
    telefonoFijo:fijo,
    correoElectronico:email,
    nivelEducacionalId,
    profesionId,
    lugarDeTrabajo:lugarTrabajo,
    celularTrabajo,
    telefonoFijoTrabajo:fijoTrabajo,
    correoElectronicoTrabajo:emailTrabajo
  };
    this.matriculaService.guardarApoderado(apoderado).subscribe(resp => {
      if (resp.estado === "ok") {
        localStorage.setItem('apoderadoSuplente', JSON.stringify(resp.valor));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
        this.cargando = false;
        this.router.navigate(['/fichadematricula/resumen'])
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      }
    })
    //this.router.navigate(['/fichadematricula/informacioncomplementaria'])
  }
  buscar(){
    let rut =this.formulario.value.rut;
    if(rut.length>0){
    this.matriculaService.obtenerApoderadoPorRut(rut).subscribe(resp => {
      if (resp.estado == "ok"&&resp.valor.rut) {
        let apoderado=resp.valor;
        this.formulario.patchValue({
          rut:apoderado.rut,
          nombre:apoderado.nombre,
          apellidoPaterno:apoderado.apellidoPaterno,
          apellidoMaterno:apoderado.apellidoMaterno,
          generoId:apoderado.generoId,
          fechaNacimiento:apoderado.fechaDeNacimiento,
          paisId:apoderado.paisId,
          etniaId:apoderado.etniaId,
          religionId:apoderado.religionId,
          estadoCivilId:apoderado.estadoCivilId,
          tenenciaDeViviendaId:apoderado.tenenciaDeViviendaId,
          calle:apoderado.calle,
          nro:apoderado.numero,
          dpto:apoderado.departamento,
          regionId:apoderado.regionId,
          comunaId:apoderado.comunaId,
          celular:apoderado.celular,
          fijo:apoderado.telefonoFijo,
          email:apoderado.correoElectronico,
          nivelEducacionalId:apoderado.nivelEducacionalId,
          profesionId:apoderado.profesionId,
          lugarTrabajo:apoderado.lugarDeTrabajo,
          celularTrabajo:apoderado.celularTrabajo,
          fijoTrabajo:apoderado.telefonoFijoTrabajo,
          emailTrabajo:apoderado.correoElectronicoTrabajo
        });
      }
    })
  }
  }
}
