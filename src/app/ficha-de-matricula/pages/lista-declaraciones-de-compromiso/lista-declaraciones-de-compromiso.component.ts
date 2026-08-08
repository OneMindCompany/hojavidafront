import { Component, OnInit } from '@angular/core';
import { DeclaracionesDeCompromisoService } from '../../services/declaraciones-de-compromiso.service';
import { DeclaracionDeCompromiso } from '../../models/daclaracion-de-compromiso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/seguridad/services/autenticacion.service';
import {  MessageService } from 'primeng/api';


@Component({
  selector: 'app-lista-declaraciones-de-compromiso',
  templateUrl: './lista-declaraciones-de-compromiso.component.html',
  styleUrls: ['./lista-declaraciones-de-compromiso.component.css'],
  providers: [MessageService]
})
export class ListaDeclaracionesDeCompromisoComponent implements OnInit {
  cargando: boolean = false;
  declaraciones: DeclaracionDeCompromiso[] = []
  displayMaximizable: boolean = false;
  formulario: FormGroup = this.fb.group({
    id: [0],
    colegioId: [0],
    descripcion: ["", Validators.required],
    vigente: [false],
  });
  get usuario(){
    return this.autenticacionService.usuario;
  } 
  constructor(private autenticacionService: AutenticacionService, 
    private declaracionesService: DeclaracionesDeCompromisoService,
    private fb: FormBuilder,
    private messageService: MessageService) { 
      this.formulario.patchValue({
        colegioId: this.usuario.colegioId
      });
    }

  ngOnInit(): void {
    this.recargarlista();
  }
  recargarlista(){
    this.cargando = true;
    this.declaracionesService.obtenerDeclaraciones(this.usuario.colegioId).subscribe(resp => {
      if (resp.estado === 'ok' && resp.valor.length > 0) {
        this.declaraciones = resp.valor;
        this.cargando = false;
      } else {
        this.cargando = false;
      }
    });
  }
  guardar() {
    this.cargando = true;
    const {
      id,
      colegioId,
      descripcion,
      vigente } = this.formulario.value;
    let declaracionDeCompromiso = new DeclaracionDeCompromiso();
    declaracionDeCompromiso = {
      id,
      descripcion,
      vigente,
      fechaDeRegistro:'',
      colegioId:+colegioId,
      
    };
    //console.log(declaracionDeCompromiso);
    this.declaracionesService.guardarDeclaracion(declaracionDeCompromiso).subscribe(resp => {
      this.cargando = false;
      if (resp.estado === "ok") {  
        this.recargarlista();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      }
      this.formulario.patchValue({
        colegioId: +this.usuario.colegioId,
        id:0,
        descripcion:'',
        vigente:''
      });
      this.displayMaximizable = false;
    });
  }
  editar(id: number) {
    const declaracion = this.declaraciones.find(pm => pm.id == id);
    if (declaracion) {
      this.formulario.patchValue({
        colegioId: +this.usuario.colegioId,
        id:+declaracion.id,
        descripcion:declaracion.descripcion,
        vigente:declaracion.vigente
      });
    }
  };
  eliminar(id:number){
    this.cargando = true;
    this.declaracionesService.eliminarDeclaracion(id).subscribe(resp => {
      this.cargando = false;
      if (resp.estado === "ok") {  
        this.recargarlista();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      }
    });
  };
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

}
