import { Component, OnInit } from '@angular/core';
import { Colegio } from '../../../shared/interfaces/colegio';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColegioService } from 'src/app/shared/services/colegio.service';
import { AutenticacionService } from 'src/app/seguridad/services/autenticacion.service';


@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.css'],
  providers: [MessageService]
})
export class ColegioComponent implements OnInit {

  cargando: boolean = false;
  colegio: Colegio = new Colegio();
  mostrarModal: boolean = false;
  logoArchivo: File = new File(["sinArchivo"], "sinArchivo.txt");
  planSeguridadEscolarArchivo: File = new File(["sinArchivo"], "sinArchivo.txt");
  planConvivenciaEscolarArchivo: File = new File(["sinArchivo"], "sinArchivo.txt");
  reglamentoInternoArchivo: File = new File(["sinArchivo"], "sinArchivo.txt");
  proyectoEducativoArchivo: File = new File(["sinArchivo"], "sinArchivo.txt");

  get usuario(){
    return this.autenticacionService.usuario;
  }   
  formulario: FormGroup = this.fb.group(
    {
      colegioId: [''],
      rbd: ['', Validators.required],
      nombre: ['', Validators.required],
      email: [''],
      telefono: [''],
      direccion: [''],
    }

  )

  constructor(
    private colegiosService: ColegioService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private autenticacionService: AutenticacionService
  ) {
    //console.log(this.usuario.colegioId);
    this.formulario.patchValue({
      colegioId: this.usuario.colegioId
    });
    if (localStorage.getItem('token')) {
      this.colegiosService.obtenerColegio(this.usuario.colegioId).subscribe(resp => {
        this.colegio = resp.valor;
        console.log(this.colegio);
        //con patchValue, no es necesario actualizar todos los campos.
        this.formulario.patchValue({
          rbd: this.colegio.rbd,
          nombre: this.colegio.nombre,
          email: this.colegio.email,
          telefono: this.colegio.telefono,
          direccion: this.colegio.direccion
        });
      });
    }
  }

  ngOnInit(): void {

  }
  mostrarFormulario() {
    this.mostrarModal = true;
  }
  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }
  //Select Colegio
  recibirColegioId(colegioId:number){
    this.colegiosService.obtenerColegio(colegioId).subscribe(resp => {
      this.colegio = resp.valor;
      //con patchValue, no es necesario actualizar todos los campos.
      this.formulario.patchValue({
        rbd: this.colegio.rbd,
        colegioId:this.colegio.id,
        nombre: this.colegio.nombre,
        email: this.colegio.email,
        telefono: this.colegio.telefono,
        direccion: this.colegio.direccion
      });
    });
  }
  manejadorArchivo(event: Event, campo: string): void {
    const input = event.target as HTMLInputElement;
    if(!input.files?.length){
      return;
    }
    let archivo: File = input.files[0];
    switch (campo) {
      case 'logo':
        this.logoArchivo = archivo;
        break;
      case 'planSeguridadEscolar':
        this.planSeguridadEscolarArchivo = archivo;
        break;
      case 'planConvivenciaEscolar':
        this.planConvivenciaEscolarArchivo = archivo;
        break;
      case 'reglamentoInterno':
        this.reglamentoInternoArchivo = archivo;
        break;
      case 'proyectoEducativo':
        this.proyectoEducativoArchivo = archivo;
        break;
      default:
        break;
    }

  }
  guardarColegio() {
    
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    const formData = new FormData();
    formData.append("Id", this.colegio.id.toString());
    formData.append("Rbd", this.formulario.value.rbd);
    formData.append("Nombre", this.formulario.value.nombre);
    formData.append("Email", this.formulario.value.email);
    formData.append("Telefono", this.formulario.value.telefono);
    formData.append("Direccion", this.formulario.value.direccion);
    formData.append("ComunaId", this.colegio.comunaId.toString());
    formData.append("RegionId", this.colegio.regionId.toString());
    //debe enviarse los path de los anteriores archivos
    formData.append("Logo", this.colegio.logo);
    formData.append("PlanSeguridadEscolar", this.colegio.planSeguridadEscolar);
    formData.append("ReglamentoInterno", this.colegio.reglamentoInterno);
    formData.append("ProyectoEducativo", this.colegio.proyectoEducativo);
    formData.append("PlanConvivenciaEscolar", this.colegio.planConvivenciaEscolar);
    //se envia los nuevos archivos, pueden ser vacios.
    if (this.logoArchivo.name != "sinArchivo.txt") {
      formData.append("LogoArchivo", this.logoArchivo);
    }
    if (this.planSeguridadEscolarArchivo.name != "sinArchivo.txt") {
      formData.append("PlanSeguridadEscolarArchivo", this.planSeguridadEscolarArchivo);
    }
    if (this.reglamentoInternoArchivo.name != "sinArchivo.txt") {
      formData.append("ReglamentoInternoArchivo", this.reglamentoInternoArchivo);
    }
    if (this.proyectoEducativoArchivo.name != "sinArchivo.txt") {
      formData.append("ProyectoEducativoArchivo", this.proyectoEducativoArchivo);
    }
    if (this.planConvivenciaEscolarArchivo.name != "sinArchivo.txt") {
      formData.append("PlanConvivenciaEscolarArchivo", this.planConvivenciaEscolarArchivo);
    }
    
    this.colegiosService.actualizarColegio(formData).subscribe(resp => {
      this.colegio = resp.valor;
      this.messageService.add({ severity:'success', summary: 'Success', detail: resp.mensaje });
      this.cargando = false;
      this.mostrarModal=false;
    });
  }

}
