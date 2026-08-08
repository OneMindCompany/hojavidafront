import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AutenticacionService } from 'src/app/seguridad/services/autenticacion.service';
import { MatriculaService } from '../../../ficha-de-matricula/services/matricula.service';
@Component({
  selector: 'app-menu-aside',
  templateUrl: './menu-aside.component.html',
  styles: [
  ]
})
export class MenuAsideComponent implements OnInit {

  constructor(private matriculaService:MatriculaService, private autenticacionService: AutenticacionService) {
    this.autenticacionService.getTokenDecoded();
   }

  cargando:boolean=false;
  administrador:boolean=false; 
  superadministrador:boolean=false; 
  funcionario:boolean=false; 
  apoderado:boolean=false; 
  autenticado:boolean=false;   
  get usuario(){
    return this.autenticacionService.usuario;
  } 
  items: MenuItem[]=[];
  ngOnInit() {
    if(this.usuario.rol=="Administrador"){
      this.administrador=true;  
    }
    if(this.usuario.rol=="Funcionario"){
      this.funcionario=true;  
    }
    if(this.usuario.rol=="SuperAdministrador"){
      this.superadministrador=true;  
    }
    if(this.usuario.rol=="Apoderado"){
      this.apoderado=true;  
    }
    if(this.usuario.autenticado){
      this.autenticado=true;  
    }
   
    this.items = [
        {
            label: 'Ficha de Matrícula',
            icon: 'pi pi-fw pi-id-card',
            items: [
                {label: 'Nueva Matrícula', icon: 'pi pi-fw pi-pencil', routerLink:'/fichadematricula/nueva',visible:this.usuario.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)},
                {label: 'Matrículas', icon: 'pi pi-fw pi-file', routerLink:'/fichadematricula/matriculas',visible: this.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)},
                {label: 'Pre Matrículas', icon: 'pi pi-fw pi-file', routerLink:'/fichadematricula/prematriculas',visible: this.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)},
                {label: 'Matrículas De Baja', icon: 'pi pi-fw pi-file', routerLink:'/fichadematricula/matriculasdebaja',visible: this.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)},
                {label: 'Imprimir Matricula en Blanco', icon: 'pi pi-fw pi-pencil',command:(event) => { this.generarMatriculaPDF() },visible: this.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)},
                {label: 'Declaraciones De Compromiso', icon: 'pi pi-fw pi-file', routerLink:'/fichadematricula/declaraciones',visible: this.autenticado&&(this.administrador||this.superadministrador||this.apoderado|| this.funcionario)}
            ]
        },
        {
          label: 'Seguridad',
          icon: 'pi pi-fw pi-lock',
          items: [
              {label: 'Registrar Usuario', icon: 'pi pi-fw pi-pencil', routerLink:'/seguridad/register'},
              {label: 'Listar', icon: 'pi pi-fw pi-file', routerLink:'/seguridad/register',visible:this.usuario.autenticado&&(this.administrador||this.superadministrador)}
          ]
      },
      {
        label: 'Información del Colegio',
        icon: 'pi pi-fw pi-cog',
        items: [
            {label: 'Colegio', icon: 'pi pi-fw pi-pencil', routerLink:'/informaciondecolegio/colegio',visible:this.usuario.autenticado&&(this.administrador||this.superadministrador)},
            {label: 'Apoderados', icon: 'pi pi-fw pi-file', routerLink:'/informaciondecolegio/apoderados',visible:this.usuario.autenticado&&(this.administrador||this.superadministrador)}
        ]
    },
    {
      label: 'Super Administración',
      icon: 'pi pi-fw pi-cog',
      visible:this.usuario.autenticado&&(this.superadministrador),
      items: [
          {label: 'Nuevo Colegio', icon: 'pi pi-fw pi-pencil', routerLink:'/super/nuevocolegio'}
      ]
  },
    ];
}
generarMatriculaPDF():boolean{
  this.cargando = true;
  let matriculaId=0;
  let nombre="Plantilla_de_Matrícula.pdf"
  this.matriculaService.obtenerFichaDeMatriculaReportePDF(matriculaId,nombre).subscribe( resp=>{
    this.cargando=false;
    
  }
  );
  return true;
}
}
