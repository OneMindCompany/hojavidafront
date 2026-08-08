import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from 'primeng/api';

import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  cargando: boolean = false;


  formulario: FormGroup = this.fb.group({
    Run: ['', Validators.required],
    Password: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private autenticacionService: AutenticacionService, 
    private messageService: MessageService) { }
  ngOnInit(): void {
    
  }
  
  login() {
    this.cargando = true;
    
    const { Run, Password } = this.formulario.value;
    this.autenticacionService.login(Run, Password)
      .subscribe(resp => {
        if (resp.estado === "ok") {
          this.messageService.add({ severity:'success', summary: 'Success', detail: resp.mensaje });
          this.cargando = false;
          localStorage.removeItem('nuevaMatricula');
          this.router.navigate(['/home']).finally(()=>{window.location.reload();});
          

        } else {
          this.cargando = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });

        }
      })


  };

}
