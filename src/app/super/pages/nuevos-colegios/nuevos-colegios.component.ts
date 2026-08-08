import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { NuevosColegiosService } from '../../services/nuevos-colegios.service';

@Component({
  selector: 'app-nuevos-colegios',
  templateUrl: './nuevos-colegios.component.html',
  styleUrls: ['./nuevos-colegios.component.css'],
  providers: [MessageService]
})
export class NuevosColegiosComponent implements OnInit {

  cargando:boolean=false;
  archivo: File = new File(["sinArchivo"], "sinArchivo.xlsx");
  anios: SelectItem[] = [];
  opciones: SelectItem[] = [
    { label: "Alumnos", value: 1 },
    { label: "Profesores", value: 2 },
    { label: "Asistentes de la Educación", value: 3 }
  ];
 
  formulario: FormGroup = this.fb.group(
    {
      archivo: ['', Validators.required],
      categoriaId: ['', Validators.required],
      gestion: ['', Validators.required],

    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private nuevosColegiosService:NuevosColegiosService
    ) {
      this.obtenerAnios();

  }
  ngOnInit(): void {
  }
  obtenerAnios() {
    let anioActual = new Date().getFullYear();
    let anioSiguiente = anioActual + 1;
    this.anios.push({ label: `${anioActual}`, value: anioActual });
    this.anios.push({ label: `${anioSiguiente}`, value: anioSiguiente });
  }
  guardarDatosGenerales() {

    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
    }
    this.cargando = true;
    const formData = new FormData();
    formData.append("categoriaId", this.formulario.value.categoriaId.value);
    formData.append("gestion", this.formulario.value.gestion.value);
    formData.append("archivo", this.archivo);
    this.nuevosColegiosService.importarData(formData).subscribe(resp=>{
      this.cargando=false;
      this.formulario.reset();
      this.messageService.add({ severity:'success', summary: 'Success', detail: resp.mensaje });
    })
  }
  manejadorArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(!input.files?.length){
      return;
    }
    this.archivo = input.files[0];
  }
  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

}
