import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaDeMatriculaRoutingModule } from './ficha-de-matricula-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule }    from '@angular/forms';
import { RutificadoPipe } from './pipes/rutificado.pipe';
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
import { SelectAnioMatriculaComponent } from './components/select-anio-matricula/select-anio-matricula.component';




@NgModule({
  declarations: [
    RutificadoPipe,
    MatriculaComponent,
    NuevaComponent,
    DatosDeAlumnoComponent,
    ApoderadoTitularComponent,
    ApoderadoSuplenteComponent,
    ResumenComponent,
    InformacionComplementariaComponent,
    ListaPreMatriculasComponent,
    ListaMatriculasComponent,
    ListaMatriculasDeBajaComponent,
    EncargadoDeRetiroComponent,
    ListaDeclaracionesDeCompromisoComponent,
    SelectAnioMatriculaComponent,


  ],
  imports: [
    CommonModule,
    FichaDeMatriculaRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule 
  ],
  exports: [
  ]
})
export class FichaDeMatriculaModule { }
