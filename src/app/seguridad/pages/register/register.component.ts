import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';

import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  cargando:boolean=false;
  get usuario(){
    return this.autenticacionService.usuario;
  } 
  
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private autenticacionService: AutenticacionService, 
    private messageService: MessageService
    ) { }
  ngOnInit(): void {
    //en caso de inicializar y contar con campos parciales del formulario.
    // this.formularioRegistro.reset({
    //   run:'',
    //   password:'',
    // })
  }

  formularioRegistro: FormGroup= this.fb.group({
    colegioId:[0],
    rolId:[''],
    email:[''],
    run:['',[Validators.required, Validators.minLength(4)]],
    password:['',[Validators.required,Validators.minLength(4)]],
    confirmPassword:['',Validators.required]}
    , {
      validator:this.checkpassword
    }
    )
  register(){
    
    if(this.formularioRegistro.invalid){
      this.formularioRegistro.markAllAsTouched();
      return;
    }
    if(this.usuario.rol=="Administrador"){
      this.formularioRegistro.get('colegioId')?.reset(this.usuario.colegioId);
    }
    this.cargando = true;
    const { run, password,colegioId,rolId,email } = this.formularioRegistro.value;
    this.autenticacionService.register(run,password,colegioId,0,rolId,email)
    .subscribe(resp=>{
      this.cargando = false;
      if (resp.estado === "ok") {
        this.messageService.add({ severity:'success', summary: 'Success', detail: resp.mensaje });    
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      }
    })
    
  }
  checkpassword(formulario:FormGroup):ValidationErrors|null{
    const pass=formulario.controls.password.value;
    const passConfirm=formulario.controls.confirmPassword.value;
    return pass===passConfirm ? null:{noIguales:true};
  }
  campoNoEsIgual(campo:string){
    return this.formularioRegistro.errors?.noIguales &&this.formularioRegistro.get(campo)?.touched
  }
  campoNoEsValido(campo:string){
    return this.formularioRegistro.controls[campo].errors&&this.formularioRegistro.controls[campo].touched;
  }
 //Select Colegio
 recibirColegioId(colegioId:number){
  this.formularioRegistro.get('colegioId')?.reset(colegioId);
}
 //Select Rol
 recibirRolId(rolId:string){
  this.formularioRegistro.get('rolId')?.reset(rolId);
}
}
