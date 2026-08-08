import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { NuevaComponent } from './pages/nueva/nueva.component';
import { DatosDeAlumnoComponent } from './pages/datos-de-alumno/datos-de-alumno.component';
import { ApoderadoTitularComponent } from './pages/apoderado-titular/apoderado-titular.component';
import { ApoderadoSuplenteComponent } from './pages/apoderado-suplente/apoderado-suplente.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { InformacionComplementariaComponent } from './pages/informacion-complementaria/informacion-complementaria.component';
import { ListaPreMatriculasComponent } from './pages/lista-pre-matriculas/lista-pre-matriculas.component';
import { ListaMatriculasComponent } from './pages/lista-matriculas/lista-matriculas.component';
import { ListaMatriculasDeBajaComponent } from './pages/lista-matriculas-de-baja/lista-matriculas-de-baja.component';
import { EncargadoDeRetiroComponent } from './pages/encargado-de-retiro/encargado-de-retiro.component';
import { ListaDeclaracionesDeCompromisoComponent } from './pages/lista-declaraciones-de-compromiso/lista-declaraciones-de-compromiso.component';


const routes: Routes = [
  {
    path: '',
    component: MatriculaComponent,
    children: [
      {
        path: 'nueva',
        component: NuevaComponent
      },
      {
        path: 'alumno',
        component: DatosDeAlumnoComponent
      },
      {
        path: 'informacioncomplementaria',
        component: InformacionComplementariaComponent
      },
      {
        path: 'apoderadot',
        component: ApoderadoTitularComponent
      },
      {
        path: 'apoderados',
        component: ApoderadoSuplenteComponent
      },
      {
        path: 'encargado',
        component: EncargadoDeRetiroComponent
      },
      {
        path: 'resumen',
        component: ResumenComponent
      },
      
      

    ]
    
  },
  {
    path: 'prematriculas',
    component:ListaPreMatriculasComponent
  },
  {
    path: 'matriculas',
    component:ListaMatriculasComponent
  },
  {
    path: 'matriculasdebaja',
    component:ListaMatriculasDeBajaComponent
  },
  {
    path: 'declaraciones',
    component:ListaDeclaracionesDeCompromisoComponent
  },
  {
        path: '**',
        redirectTo: 'nueva'
      }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FichaDeMatriculaRoutingModule { }
