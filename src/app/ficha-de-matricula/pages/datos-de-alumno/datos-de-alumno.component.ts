import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DatosDeAlumno } from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-datos-de-alumno',
  templateUrl: './datos-de-alumno.component.html',
  styleUrls: ['./datos-de-alumno.component.css']
})
export class DatosDeAlumnoComponent implements OnInit {

  cargando: boolean = false;
  matriculaId: number = 0;
  edad:number=0;
  datosDelAlumno: DatosDeAlumno = new DatosDeAlumno();
  fotoArchivo: File = new File([""], "");
  fotoPreview: string | ArrayBuffer | undefined | null = '../../../assets/global-image/sinimagen.jpg';

  nuevoHermano: FormControl = this.fb.control('', Validators.required);


  formulario: FormGroup = this.fb.group({
    matriculaId: [0],
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: [''],
    paisId: [0, Validators.required],
    etniaId: [''],
    religionId: [''],
    generoId: [0, Validators.required],
    nombreSocial: [''],
    fechaNacimiento: ['', Validators.required],
    calle: ['', Validators.required],
    nro: [0],
    dpto: [''],
    regionId: [0, Validators.required],
    comunaId: [0, Validators.required],
    celular: [''],
    email: [''],
    viveCon: ['', Validators.required],
    hermanos: this.fb.array([

    ])
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
      this.matriculaId = matriculaId;
      this.matriculaService.obtenerDatosDeAlumno(matriculaId).subscribe(resp => {
        if (resp.estado == "ok"&&resp.valor.apellidoPaterno) {
          
          this.datosDelAlumno = resp.valor;
          if(resp.valor.fotografia){
          this.fotoPreview=resp.valor.fotografia;
        }
        if(this.datosDelAlumno.nombre==="nuevo"){
          this.datosDelAlumno.nombre="";
        }
          this.formulario.patchValue({
            matriculaId: matriculaId,
            nombre: this.datosDelAlumno.nombre,
            apellidoPaterno: this.datosDelAlumno.apellidoPaterno,
            apellidoMaterno: this.datosDelAlumno.apellidoMaterno,
            paisId: this.datosDelAlumno.paisId,
            etniaId: this.datosDelAlumno.etniaId,
            religionId: this.datosDelAlumno.religionId,
            generoId: this.datosDelAlumno.generoId,
            nombreSocial: this.datosDelAlumno.nombreSocial,
            fechaNacimiento: this.datosDelAlumno.fechaDeNacimiento,
            calle: this.datosDelAlumno.calle,
            nro: this.datosDelAlumno.numero,
            dpto: this.datosDelAlumno.departamento,
            regionId: this.datosDelAlumno.regionId,
            comunaId: this.datosDelAlumno.comunaId,
            celular: this.datosDelAlumno.celular,
            email: this.datosDelAlumno.correoElectronico,
            viveCon: this.datosDelAlumno.viveCon,
          });
          // console.log(this.formulario.value)
          this.datosDelAlumno.hermanosEnColegio.forEach(hermano=>{
            this.hermanosArr.push(this.fb.control(hermano, Validators.required));
            this.nuevoHermano.reset();
          });
          this.generarEdad();
          
        }
      })
    }

  }
  ngOnInit(): void {

  }

  agregarHermano() {
    if (this.nuevoHermano.invalid) {
      return;
    }
    this.hermanosArr.push(this.fb.control(this.nuevoHermano.value, Validators.required));

    this.nuevoHermano.reset();
  }
  borrarHermano(i: number) {
    this.hermanosArr.removeAt(i);
  }
  campoNoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }


  filePreview(input: HTMLInputElement) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPreview = e.target?.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  manejadorArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filePreview(input);
    if (!input.files?.length) {
      return;
    }
    this.fotoArchivo = input.files[0];
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
  //Una vez que lleno la fecha de nacimiento se debe generar la edad
  generarEdad(){
    let hoy = new Date();
    let fechaNacimiento:string=this.formulario.value.fechaNacimiento;
    // let re=/\//g;
    // fechaNacimiento=fechaNacimiento.replace(re,'-');
    let dateParts = fechaNacimiento.split("/");
    var  cumpleanos = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

  this.edad= edad;
  }
  //Envio de formulario para registro
  guardarDatosDelAlumno() {
   
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    const formData = new FormData();
    formData.append("MatriculaId", this.matriculaId.toString());
    formData.append("Fotografia", this.datosDelAlumno.fotografia);
    formData.append("Nombre", this.formulario.value.nombre);
    if (this.fotoArchivo.name != "") {
      formData.append("FotografiaArchivo", this.fotoArchivo);
    }
    formData.append("ApellidoPaterno", this.formulario.value.apellidoPaterno);
    formData.append("ApellidoMaterno", this.formulario.value.apellidoMaterno);
    formData.append("GeneroId", this.formulario.value.generoId);
    formData.append("NombreSocial", this.formulario.value.nombreSocial);
    formData.append("FechaDeNacimiento", this.formulario.value.fechaNacimiento);
    formData.append("PaisId", this.formulario.value.paisId);
    formData.append("EtniaId", this.formulario.value.etniaId);
    formData.append("ReligionId", this.formulario.value.religionId);
    formData.append("Calle", this.formulario.value.calle);
    formData.append("Numero", this.formulario.value.nro);
    formData.append("Departamento", this.formulario.value.dpto);
    formData.append("RegionId", this.formulario.value.regionId.toString());
    formData.append("ComunaId", this.formulario.value.comunaId);
    formData.append("Celular", this.formulario.value.celular);
    formData.append("CorreoElectronico", this.formulario.value.email);
    formData.append("ViveCon", this.formulario.value.viveCon);
    formData.append("HermanosEnColegio", JSON.stringify(this.formulario.value.hermanos));
    this.matriculaService.guardarDatosDeAlumno(formData).subscribe(resp => {
      this.datosDelAlumno = resp.valor;
   
      localStorage.setItem('datosDeAlumno', JSON.stringify(resp.valor));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: resp.mensaje });
      this.cargando = false;
    })
    this.router.navigate(['/fichadematricula/informacioncomplementaria'])
  }
}
