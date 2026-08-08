import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EncargadoDeRetiro } from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-encargado-de-retiro',
  templateUrl: './encargado-de-retiro.component.html',
  styles: [
  ]
})
export class EncargadoDeRetiroComponent implements OnInit {

  cargando: boolean = false;
  matriculaId: number = 0;

  formulario: FormGroup = this.fb.group({
    matriculaId: [0],
    rut: [''],
    nombreCompleto: [''],
    direccion: [''],
    telefono: [''],
    celular: [''],
    email: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matriculaService: MatriculaService,
    private messageService: MessageService
  ) {

    if (localStorage.getItem('nuevaMatricula')) {
      const { matriculaId } = JSON.parse(localStorage.getItem('nuevaMatricula')!);
      this.matriculaId = matriculaId;
      this.formulario.patchValue({
        matriculaId: matriculaId
      });
      this.matriculaService.obtenerEncargadoDeRetiro(matriculaId).subscribe(resp => {
        if (resp.estado == "ok" && resp.valor.rut) {
          let encargadoDeRetiro = resp.valor;
          localStorage.setItem('encargadoDeRetiro', JSON.stringify(resp.valor));
          this.formulario.patchValue({
            matriculaId: encargadoDeRetiro.matriculaId,
            rut: encargadoDeRetiro.rut,
            nombreCompleto: encargadoDeRetiro.nombreCompleto,
            direccion: encargadoDeRetiro.direccion,
            telefono: encargadoDeRetiro.telefono,
            celular:encargadoDeRetiro.celular,
            email: encargadoDeRetiro.email,
          });
        }
      })
    }
  }
  ngOnInit(): void {

  }
  //Envio de formulario para registro
  guardarDatosDeEncargadoDeRetiro() {
    const {
      rut,
      nombreCompleto,
      direccion,
      telefono,
      celular,
      email,
    } = this.formulario.value;
    let encargadoDeRetiro = new EncargadoDeRetiro();
    encargadoDeRetiro = {
      matriculaId: this.matriculaId,
      rut,
      nombreCompleto,
      direccion,
      telefono,
      celular,
      email,
    };
    this.matriculaService.guardarEncargadoDeRetiro(encargadoDeRetiro).subscribe(resp => {
      if (resp.estado === "ok") {
        localStorage.setItem('encargadoDeRetiro', JSON.stringify(resp.valor));
        this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
        this.cargando = false;
        this.router.navigate(['/fichadematricula/resumen'])
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resp.mensaje });
      }
    })
  }


}
